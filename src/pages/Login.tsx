import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ILogin {
  mobile: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
    axios
      .post("https://nowruzi.top/api/User/Login", data)
      .then((response) => {
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("fullName", response.data.data.fullName);
        toast.success(response.data.message, {
          autoClose: 1200
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <p>فرم ورود</p>
        <div>
          <label htmlFor="userName"> نام کاربری</label>
          <input
            type="text"
            {...register("mobile", {
              required: "نام کاربری خود را وارد کنید",
            })}
          />
          {errors.mobile && <p className="error">{errors.mobile.message}</p>}
        </div>

        <div>
          <label htmlFor="password"> رمز ورود</label>
          <input
            type="password"
            {...register("password", { required: "رمز عبور خود را وارد کنید" })}
          />
          {errors.password && (
            <p className="error"> {errors.password.message} </p>
          )}
        </div>

        <button type="submit">ورود</button>
      </form>
    </div>
  );
}
