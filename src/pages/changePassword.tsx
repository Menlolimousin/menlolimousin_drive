import Spinners from "@components/Spinners";
import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/Messages";
import React, { useState } from "react";

const changePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col px-4 py-8">
      <h1>New Password</h1>
      <input
        autoComplete="off"
        placeholder="Lütfen Yeni parolanızı giriniz"
        name="newPassword"
        type="password"
        minLength={6}
        onChange={(e) => setNewPassword(e.target.value)}
        className="lg:mr-3 mb-6 lg:mb-0 w-full focus:border-black  border h-10 px-3 border-primary-changePassword focus:outline-none"
      />
      <div className="h-10 w-full mb-4">
        <button
          className={`border border-black text-white w-full bg-black h-full text-lg`}
          type="submit"
          disabled={loading}
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            await api()
              .post("/Auth/Drive/changePassword", { newPassword })
              .then((data) => {
                Success(data.data.message);
                setLoading(false);
                setNewPassword("");
              })
              .catch(() => {
                Error("Bir hata oluştu lütfen tekrar deneyiniz.");
                setLoading(false);
              });
          }}
        >
          <span className={`${loading && "flex items-center justify-center"}`}>
            {loading ? (
              <Spinners type="TailSpin" w={35} h={35} />
            ) : (
              "Şifreyi Değiştir"
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default changePassword;
