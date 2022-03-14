import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "store/actions/authAction";
import { useRouter } from "next/router";
import { AppState } from "store";

import { loginElements } from "@utils/lib/listElements";

import Spinners from "@components/Spinners";
import Cookies from "js-cookie";

const Signin = () => {
  const dispatch = useDispatch();

  const { loading, status } = useSelector((state: AppState) => state.auth);

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (status == 200) {
      router.push("/");
    }
  }, [status]);
  useEffect(() => {
    router.prefetch("/");
  }, []);
  useEffect(() => {
    if (Cookies.get("driveToken")) router.replace("/");
  }, []);

  return (
    <>
      {Cookies.get("driveToken") ? null : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (form?.email && form?.password) {
              dispatch(Login(form));
            }
          }}
          method="POST"
          className="mx-auto rounded  shadow-sm p-4  max-w-md w-full bg-white"
        >
          <h3 className="text-3xl mb-6">Sign in</h3>
          {loginElements?.map((items, index) => {
            return (
              <div className="mb-5" key={index}>
                <label className="text-primary-bookingIcon text-sm  font-semibold">
                  {items.title}
                </label>

                <div className="flex flex-col">
                  <input
                    autoComplete="off"
                    type={items.type}
                    placeholder={items.placeholder}
                    name={items.name}
                    onChange={(e: any) =>
                      setForm({ ...form, [items.name]: e.target.value })
                    }
                    minLength={items.minLength}
                    className="lg:mr-3 mb-6 lg:mb-0 w-full focus:border-black  border h-10 px-3 border-primary-changePassword focus:outline-none"
                  />
                </div>
              </div>
            );
          })}
          <div className="h-10 w-full mb-4">
            <button
              className={`border border-black text-white w-full bg-black h-full text-lg`}
              type="submit"
              disabled={loading}
            >
              <span
                className={`${loading && "flex items-center justify-center"}`}
              >
                {loading ? (
                  <Spinners type="TailSpin" w={35} h={35} />
                ) : (
                  "Sign In"
                )}
              </span>
            </button>
          </div>
          {/* <div>
            <label>
              <Link href="/passwordReset">
                <a className="underline font-semibold">Forgot password?</a>
              </Link>
            </label>
          </div> */}
        </form>
      )}
    </>
  );
};

export default Signin;
