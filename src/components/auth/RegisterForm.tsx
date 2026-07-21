import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react";
import { registerSchema, type RegisterFormData } from "../../schemas/auth.schema";
import { getRegisterError } from "../../utils/auth-error";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";
import { GoogleIcon } from "../svg/GoogleIcon";

export function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });
  
    async function onSubmit(data: RegisterFormData) {
      try {
        setGeneralError("");
        setLoading(true);
  
        const { error } = await supabase.auth.signUp({
          email: data.email.trim().toLowerCase(),
          password: data.password,
          options: {
            data: {
              name: data.name,
            },
          },
        });
  
        if (error) {
          setGeneralError(getRegisterError(error.message));
          return;
        }
  
      } catch {
        setGeneralError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          label="Name"
          placeholder="John"
          icon={<User size={18} />}
          error={errors.name?.message}
          {...register("name")}
        />
  
        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          autoComplete="email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />
  
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register("password")}
        />
  
        {generalError && (
          <p className="text-body text-center text-danger">
            {generalError}
          </p>
        )}
  
        <Button
          type="submit"
          loading={loading}
        >
          {loading ? "Loading..." : "Create account"}
        </Button>
  
        <Divider text="or continue with"/>
          
    
  
        <Button
          type="button"
          variant="secondary"
          className="border border-border bg-white"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
  
        <div className="text-center">
          <p className="text-body">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    );
  }
