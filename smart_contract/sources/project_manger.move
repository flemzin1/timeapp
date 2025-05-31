module project_manager::project_manager;

use std::string::{String};
use sui::vec_map::{Self, VecMap};
use std::u64::max;
use sui::object::{Self, UID, ID};
use sui::tx_context::{Self, TxContext};
use sui::transfer;
use std::vector;

// ====== Structs ======

public struct Project_holder has key, store {
    id: UID,
    project: Project
}

/// Represents a project containing multiple tasks
public struct Project has key, store {
    id: UID,
    name: String,
    owner: address,
    tasks: VecMap<ID, Task>, // Task ID => Task
    is_completed: bool,
    participants: vector<Participant>
}

public struct Participant has store {
    id: String,
    name: String,
    email: String,
    tasks_info: vector<Task_per_participant_info>
}

public struct Task_per_participant_info has store {
    task_ref: ID,
    role: String,
}

/// Represents a single task in a project
public struct Task has store, drop {
    id: ID,
    name: String,
    duration: u64,
    start_time: u64,     // Set by off-chain CPA
    end_time: u64,       // Set by off-chain CPA
    is_critical: bool,   // Set by off-chain CPA
    is_completed: bool,
    dependencies: vector<ID>, // List of task IDs this task depends on
    role: String
}

public struct ParticipantInput has drop {
    id: String,
    name: String,
    email: String,
}

public struct TaskAssignment has drop {
    participant_id: String,
    task_id: ID,
    role: String,
}

// ====== Constants (Errors) ======
const E_TASK_NOT_FOUND: u64 = 1;
const E_DEPENDENCY_NOT_MET: u64 = 2;
const E_TASK_ALREADY_COMPLETED: u64 = 3;
const E_PARTICIPANT_NOT_FOUND: u64 = 4;
const E_NOT_PROJECT_OWNER: u64 = 5;
const E_INVALID_INPUT: u64 = 6;

// ====== Public Functions ======

/// Create a new project
entry public fun create_project(
    name: String,
    ctx: &mut TxContext
) {
    let project = Project {
        id: object::new(ctx),
        name,
        owner: tx_context::sender(ctx),
        tasks: vec_map::empty(),
        is_completed: false,
        participants: vector::empty<Participant>()
    };

    let project_holder = Project_holder {
        id: object::new(ctx),
        project
    };

    transfer::transfer(project_holder, tx_context::sender(ctx));
}

/// Add participants to the project
entry public fun add_participants(
    project_holder: &mut Project_holder,
    participant_ids: vector<String>,
    participant_names: vector<String>,
    participant_emails: vector<String>,
    ctx: &mut TxContext
) {
    assert!(project_holder.project.owner == tx_context::sender(ctx), E_NOT_PROJECT_OWNER);
    
    let participants_count = vector::length(&participant_ids);
    let mut i = 0;
    
    while (i < participants_count) {
        let participant_id = *vector::borrow(&participant_ids, i);
        let participant_name = *vector::borrow(&participant_names, i);
        let participant_email = *vector::borrow(&participant_emails, i);
        
        // Check if participant already exists
        let mut participant_exists = false;
        let existing_participants_count = vector::length(&project_holder.project.participants);
        let mut j = 0;
        
        while (j < existing_participants_count) {
            let existing_participant = vector::borrow(&project_holder.project.participants, j);
            if (existing_participant.id == participant_id) {
                participant_exists = true;
                break
            };
            j = j + 1;
        };
        
        if (!participant_exists) {
            let new_participant = Participant {
                id: participant_id,
                name: participant_name,
                email: participant_email,
                tasks_info: vector::empty<Task_per_participant_info>()
            };
            vector::push_back(&mut project_holder.project.participants, new_participant);
        };
        
        i = i + 1;
    };
}

/// Add a new task to the project
entry public fun add_task(
    project_holder: &mut Project_holder,
    name: String,
    duration: u64,
    dependencies: vector<ID>,
    start_time: u64,
    end_time: u64,
    is_critical: bool,
    role: String,
    ctx: &mut TxContext
) {
    assert!(project_holder.project.owner == tx_context::sender(ctx), E_NOT_PROJECT_OWNER);
    
    let task_uid = object::new(ctx);
    let task_id = object::uid_to_inner(&task_uid);

    let new_task = Task {
        id: task_id,
        name,
        duration,
        start_time,
        end_time,
        is_critical,
        is_completed: false,
        dependencies,
        role
    };
    
    vec_map::insert(&mut project_holder.project.tasks, task_id, new_task);
    object::delete(task_uid);
}

/// Assign tasks and roles to participants
entry public fun assign_tasks_to_participants(
    project_holder: &mut Project_holder,
    participant_ids: vector<String>,
    task_ids: vector<ID>,
    roles: vector<String>,
    ctx: &mut TxContext
) {
    assert!(project_holder.project.owner == tx_context::sender(ctx), E_NOT_PROJECT_OWNER);
    
    let assignments_count = vector::length(&participant_ids);
    assert!(assignments_count == vector::length(&task_ids), E_INVALID_INPUT);
    assert!(assignments_count == vector::length(&roles), E_INVALID_INPUT);
    
    let mut i = 0;
    
    while (i < assignments_count) {
        let participant_id = vector::borrow(&participant_ids, i);
        let task_id = vector::borrow(&task_ids, i);
        let role = vector::borrow(&roles, i);
        
        // Verify task exists
        assert!(vec_map::contains(&project_holder.project.tasks, task_id), E_TASK_NOT_FOUND);
        
        // Find and update participant
        let participants_count = vector::length(&project_holder.project.participants);
        let mut j = 0;
        let mut participant_found = false;
        
        while (j < participants_count) {
            let participant = vector::borrow_mut(&mut project_holder.project.participants, j);
            if (participant.id == *participant_id) {
                let task_info = Task_per_participant_info {
                    task_ref: *task_id,
                    role: *role,
                };
                vector::push_back(&mut participant.tasks_info, task_info);
                participant_found = true;
                break
            };
            j = j + 1;
        };
        
        assert!(participant_found, E_PARTICIPANT_NOT_FOUND);
        i = i + 1;
    };
}

/// Complete a task assignment function for easier frontend integration
entry public fun assign_task_and_roles_to_participant(
    project_holder: &mut Project_holder,
    participant_ids: vector<String>,
    participant_names: vector<String>,
    participant_emails: vector<String>,
    assignment_participant_ids: vector<String>,
    assignment_task_ids: vector<ID>,
    assignment_roles: vector<String>,
    ctx: &mut TxContext
) {
    // First add participants if they don't exist
    add_participants(project_holder, participant_ids, participant_names, participant_emails, ctx);
    
    // Then assign tasks to participants
    assign_tasks_to_participants(project_holder, assignment_participant_ids, assignment_task_ids, assignment_roles, ctx);
}

/// Mark a task as completed
entry public fun complete_task(
    project_holder: &mut Project_holder,
    task_id: ID,
    ctx: &mut TxContext
) {
    assert!(project_holder.project.owner == tx_context::sender(ctx), E_NOT_PROJECT_OWNER);
    assert!(vec_map::contains(&project_holder.project.tasks, &task_id), E_TASK_NOT_FOUND);

    // Check all dependencies are completed
    let mut i = 0;
    let dependencies = {
        let task = vec_map::get(&project_holder.project.tasks, &task_id);
        assert!(!task.is_completed, E_TASK_ALREADY_COMPLETED);
        &task.dependencies
    };

    while (i < vector::length(dependencies)) {
        let dep_id = vector::borrow(dependencies, i);
        let dep_task = vec_map::get(&project_holder.project.tasks, dep_id);
        assert!(dep_task.is_completed, E_DEPENDENCY_NOT_MET);
        i = i + 1;
    };

    // Update task and mark as completed
    let task = vec_map::get_mut(&mut project_holder.project.tasks, &task_id);
    task.is_completed = true;
}

// ====== View Functions ======

/// Get project info
public fun get_project(project_holder: &Project_holder): (String, address, bool) {
    (project_holder.project.name, project_holder.project.owner, project_holder.project.is_completed)
}

/// Get task info
public fun get_task(project_holder: &Project_holder, task_id: ID): ID {
    assert!(vec_map::contains(&project_holder.project.tasks, &task_id), E_TASK_NOT_FOUND);
    let task = vec_map::get(&project_holder.project.tasks, &task_id);
    task.id
}

public fun get_tasks(project_holder: &Project_holder): &VecMap<ID, Task> {
    &project_holder.project.tasks
}

public fun is_task_completed(project_holder: &Project_holder, task_id: ID): bool {
    assert!(vec_map::contains(&project_holder.project.tasks, &task_id), E_TASK_NOT_FOUND);
    let task = vec_map::get(&project_holder.project.tasks, &task_id);
    task.is_completed
}

/// Check if caller is project owner
public fun is_owner(project_holder: &Project_holder, caller: address): bool {
    project_holder.project.owner == caller
}

public fun is_project_on_schedule(project_holder: &Project_holder, now: u64): bool {
    let mut max_late = 0u64;
    let keys = vec_map::keys(&project_holder.project.tasks);
    let len = vector::length(&keys);
    let mut i = 0;
    while (i < len) {
        let key = *vector::borrow(&keys, i);
        let task = vec_map::get(&project_holder.project.tasks, &key);
        if (!task.is_completed && task.end_time < now) {
            let late_by = now - task.end_time;
            max_late = max(max_late, late_by);
        };
        i = i + 1;
    };
    max_late < 86400 // Less than 1 day late
}

public fun get_is_critical(task: &Task): bool {
    task.is_critical
}

public fun get_end_time(task: &Task): u64 {
    task.end_time
}

public fun get_is_completed(task: &Task): bool {
    task.is_completed
}

public fun get_dependencies(task: &Task): &vector<ID> {
    &task.dependencies
}