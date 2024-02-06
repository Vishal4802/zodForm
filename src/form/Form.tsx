import { FC } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import './Form.css';

interface form {
    name: string,
    age: number,
    email: string,
    password: string,
    confirmPassword: string
}

const Form:FC = () => {

    const formSchema:ZodType<form> = z.object({
        name: z.string().min(2).max(20),
        age: z.number().min(18).max(80),
        email: z.string().email(),
        password: z.string().min(6).max(20),
        confirmPassword: z.string().min(6).max(20)
    }).refine((data) => data.confirmPassword === data.password, {
        message: "password do not match",
        path: ["confirmPassword"]
    })

    const { register, handleSubmit, formState: { errors } } = useForm<form>(
        {
            resolver: zodResolver(formSchema)
        }
    )

    const submitData = (data: form) => {
        alert("data submitted")
        console.log(data)
    }

  return (
    <>
        <form onSubmit={handleSubmit(submitData)}>
            <label>Name:</label>
            <input type="text" { ...register('name') } />
            { errors.name && <span>{errors.name.message}</span> }

            <label>Age:</label>
            <input type="number" { ...register('age', { valueAsNumber: true }) } />
            { errors.age && <span>{errors.age.message}</span> }

            <label>Email:</label>
            <input type="email" { ...register('email') } />
            { errors.email && <span>{errors.email.message}</span> }
            
            <label>Password:</label>
            <input type="text" { ...register('password') } />
            { errors.password && <span>{errors.password.message}</span> }
            
            <label>Confirm password:</label>
            <input type="text" { ...register('confirmPassword') } />
            { errors.confirmPassword && <span>{errors.confirmPassword.message}</span> }
            
            <input type="submit" id="button"/>
        </form>
    </>
  )
}

export default Form;