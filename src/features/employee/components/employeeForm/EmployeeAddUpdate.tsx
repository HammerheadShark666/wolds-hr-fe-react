import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../app/hooks";  
import { RootState } from "../../../../app/store";
import { useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../../employeeThunks"; 
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from "../../validation/employeeSchema";
import { unwrapResult } from "@reduxjs/toolkit";
import { clearValidationErrors, setSelectedEmployee } from "../../employeeSlice"; 
import InputText from "../../../../components/InputText";
import InputEmail from "../../../../components/InputEmail";
import InputDate from "../../../../components/InputDate";
import InputSelect from "../../../../components/InputSelect";
import styles from "../../../employee/css/Employee-form.module.css"; 
import ErrorToast from "../../../../components/ErrorToasts";
import { toast } from "react-toastify";
import { Employee } from "../../../../types/employee";
import { updateEmployeesState } from "../../employeeListSlice";
  
type FormData = z.infer<typeof employeeSchema>;

interface IProps { 
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>; 
};

const EmployeeAddUpdate: React.FC<IProps> = ({ setShowEmployeePopUpForm }) => {

  const dispatch = useAppDispatch();

  const { loading, validationErrors } = useSelector((state: RootState) => state.employee);
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);
 
  const { 
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(employeeSchema),
  });

  function populateEmployee(data: FormData, id: number) : Employee { 
    return { 
      id: id,
      surname: data.surname.trim(),
      firstName: data.firstName.trim(), 
      dateOfBirth: data.dateOfBirth ?? null, 
      hireDate: data.hireDate ?? null,
      departmentId: data.departmentId ? data.departmentId : null,
      email: data.email ? data.email : null,
      phoneNumber: data.phoneNumber ? data.phoneNumber : null,
      photo: "",
      department: null
    }  
  }  

  const onClose = () => {
    dispatch(setSelectedEmployee(null));
    dispatch(clearValidationErrors());
    setShowEmployeePopUpForm(false);
  }

  const onSubmit = async (data: FormData) => {    

    try {   

      var resultAction = null;
      dispatch(clearValidationErrors());
      toast.dismiss(); 
      
      if (selectedEmployee != null)
        resultAction = await dispatch(updateEmployee(populateEmployee(data, selectedEmployee?.id )));      
      else     
        resultAction = await dispatch(addEmployee(populateEmployee(data, 0)));       
      
      unwrapResult(resultAction);
      setShowEmployeePopUpForm(false);

      if (selectedEmployee == null)
        dispatch(updateEmployeesState());

      reset();      
    }
    catch(error)
    {
      console.log('Error submitting employee:', error);
    }    
  };
 
  useEffect(() => {

    function setFormData(selectedEmployee: Employee)
    {
      setValue('surname', selectedEmployee.surname);
      setValue('firstName', selectedEmployee.firstName);
      setValue('phoneNumber', selectedEmployee.phoneNumber);
      setValue('email', selectedEmployee.email);
      setValue('departmentId', selectedEmployee.departmentId);
      setValue("dateOfBirth", selectedEmployee.dateOfBirth ?? null);
      setValue("hireDate", selectedEmployee.hireDate ?? null); 
    }

    if(selectedEmployee != null) {
      setFormData(selectedEmployee); 
    } 
    else 
    { 
      reset(); 
      dispatch(clearValidationErrors());
    }
  }, [selectedEmployee, setValue, reset, dispatch]);

  const departments = useSelector((state: RootState) =>
    state.department.departments
  );
    
  return (     
    <>
      <h2 className={styles["h2"]}>{ selectedEmployee == null ? "Add Employee" : "Update Employee" }</h2>
      {loading && <p>Adding employee...</p>}   
      <ErrorToast errors={validationErrors} /> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container"> 
          <InputText name="surname"  control={control}  label="Surname"  error={errors.surname}></InputText>    
          <InputText name="firstName"  control={control}  label="First Name"  error={errors.firstName}></InputText>
          <InputDate name="dateOfBirth"  control={control}  label="Date of birth"  error={errors.dateOfBirth}></InputDate>
          <InputEmail name="email"  control={control}  label="Email"  error={errors.email}></InputEmail>
          <InputText name="phoneNumber"  control={control}  label="Phone Number"  error={errors.phoneNumber}></InputText>
          <InputDate name="hireDate"  control={control}  label="Hire date"  error={errors.email}></InputDate> 
          <InputSelect name="departmentId"  control={control}  label="Department"  error={errors.departmentId} items={departments} ></InputSelect>
          <div className={styles["button-row"]}>
            <button onClick={onClose}>Close</button>
            <button type="submit">{ selectedEmployee == null ? "Add Employee" : "Update Employee"  }</button>       
          </div>
        </div>  
      </form>    
    </>    
  )
} 

export default EmployeeAddUpdate;