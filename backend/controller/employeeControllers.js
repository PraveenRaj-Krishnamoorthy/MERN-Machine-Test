import allemployees from '../model/employeeModels.js';

export const GetAllEmployees = async (req, res) => {
    try {
        const employees = await allemployees.find();
        res.status(200).json(employees);
    } catch (error) {
        console.log(`Error occurred in get all employees: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const GetOneEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await allemployees.findById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.log(`Error occurred in get one employee: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const CreateEmployee = async (req, res) => {
    console.log(req.body);
    try {
        const newEmployee = new allemployees(req.body);
        const emailExists = await allemployees.findOne({ email: req.body.email });
        if (emailExists) {
            res.status(400).json({ message: "Employee with this email already exists" });
        } else {
            await newEmployee.save();
            res.status(201).json(newEmployee);
        }
    } catch (error) {
        console.log(`Error occurred in create employee: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const UpdateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEmployee = req.body;
        const employee = await allemployees.findById(id);
        if (employee) {
            const updatedEmployeeData = await allemployees.findByIdAndUpdate(id, updatedEmployee, { new: true });
            res.status(200).json(updatedEmployeeData);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.log(`Error occurred in update employee: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const DeleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await allemployees.findByIdAndDelete(id);
        if (employee) {
            res.status(200).json({ message: "Employee deleted successfully" });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.log(`Error occurred in delete employee: ${error}`);
        res.status(500).json({ message: error.message });
    }
};