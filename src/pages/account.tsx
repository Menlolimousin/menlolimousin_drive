import withAuth from "@utils/hooks/withAuth";
import React, { useEffect, useState } from "react";
import { Input, Button, Loading, Spacer } from "@nextui-org/react";
import api from "@utils/lib/api";
import { Error, Success } from "@utils/lib/Messages";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface IVehicleClass {
  carType: string;
  carName: string;
  maxPerson: string;
  maxBag: string;
  carImage: string;
  id: any;
  setCars: any;
  w: number;
  h: number;
}
const account = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [formVehicle, setFormVehicle] = useState({
    numberPlate: "",
    vehicleName: "",
    vehicleClass: "",
    maxPeople: "",
  });
  const [loading, setLoading] = useState(false);
  const [onFocusForm, setOnFocusForm] = useState(false);
  const [onFocusFormVehicle, setOnFocusFormVehicle] = useState(false);
  const [cars, setCars] = useState<any>([]);
  const [loadingCar, setLoadingCar] = useState(false);
  const handleChangeInput = (e: {
    target: { name: string; value: string };
  }) => {
    setOnFocusForm(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeInputVehicle = (e: {
    target: { name: string; value: string };
  }) => {
    setFormVehicle({ ...formVehicle, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let { firstName, lastName, email, phoneNumber } = JSON.parse(
      localStorage.getItem("meDrive") || "{}"
    );
    setForm({ firstName, lastName, email, phoneNumber });
  }, []);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    const getCars = async () => {
      await api()
        .get("/Drive/allCars")
        .then((data: any) => {
          console.log(data.data.data);
          setCars(data.data.data);
        })
        .catch((err) => {
          Error(
            err.response.data.message ||
              "An error has occurred, please try again."
          );
        });
    };
    getCars();
  }, []);
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader: any = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      Error("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage: string) => {
    await api()
      .post("/Drive/addCar", { base64EncodedImage, ...formVehicle })
      .then((data: any) => {
        setFileInputState("");
        setPreviewSource("");
        Success("Car created successfully");
        setCars(data.data.data);
      })
      .catch(() => {
        Error("something went wrong!");
      });
  };
  return (
    <>
      <form
        className="p-8 w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setOnFocusForm(false);

          await api()
            .post("/Auth/Drive/updateProfile", form)
            .then(async (data) => {
              setLoading(false);
              Success(data.data.message);
              await localStorage.setItem(
                "meDrive",
                JSON.stringify(data.data.data)
              );
            })
            .catch((err) => {
              setLoading(false);
              Error(
                err.response.data.message ||
                  "An error has occurred, please try again."
              );
              setOnFocusForm(true);
            });
        }}
      >
        <h1 className="mb-4 text-3xl text-red-500">Account Settings</h1>
        <Input
          label="First Name"
          placeholder="Omer Keskin"
          className="mb-4"
          value={form?.firstName}
          fullWidth={true}
          name="firstName"
          onChange={handleChangeInput}
        />
        <Input
          className="mb-4"
          value={form?.lastName}
          label="Last Name"
          name="lastName"
          placeholder="Omer Keskin"
          fullWidth={true}
          onChange={handleChangeInput}
        />
        <Input
          className="mb-4"
          value={form?.email}
          name="email"
          label="Email"
          placeholder="tester@gmail.com"
          fullWidth={true}
          onChange={handleChangeInput}
        />{" "}
        <PhoneInput
          country={"us"}
          inputProps={{
            name: "phoneNumber",
          }}
          containerClass="focus:border-black"
          value={form?.phoneNumber}
          onChange={(e, a, props) => {
            setForm({
              ...form,
              [props.target.name]: e.replace(/\s+/g, ""),
            });
          }}
        />
        <div className="my-4 w-full flex flex-row-reverse">
          <Button
            auto
            // type="submit"
            clickable={onFocusForm}
            color="primary"
            css={{ px: "$13" }}
          >
            {loading ? <Loading color="white" size="sm" /> : "Save"}
          </Button>
        </div>
      </form>
      <form onSubmit={handleSubmitFile} className="p-8 w-full">
        <h1 className="mb-4 text-3xl text-red-500">Vehicles Settings</h1>
        <Input
          value={formVehicle?.vehicleName}
          label="Vehicle Name"
          className="mb-4"
          name="vehicleName"
          placeholder="Chevrolet Suburban 4WD"
          fullWidth={true}
          onChange={handleChangeInputVehicle}
        />
        <Input
          value={formVehicle?.vehicleClass}
          name="vehicleClass"
          label="Vehicle Class"
          className="mb-4"
          placeholder="Luxury SUV"
          fullWidth={true}
          onChange={handleChangeInputVehicle}
        />
        <Input
          label="Number Plate"
          placeholder="64001U2"
          value={formVehicle?.numberPlate}
          fullWidth={true}
          className="mb-4"
          name="numberPlate"
          onChange={handleChangeInputVehicle}
        />

        <Input
          value={formVehicle?.maxPeople}
          className="mb-4"
          name="maxPeople"
          type="number"
          label="Max People"
          placeholder="7"
          fullWidth={true}
          onChange={handleChangeInputVehicle}
        />

        <input
          id="fileInput"
          type="file"
          className="mb-4"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <div className="flex flex-row-reverse">
          <Button
            auto
            // type="submit"
            // clickable={false}
            color="success"
            css={{ px: "$13" }}
          >
            {loadingCar ? <Loading color="white" size="sm" /> : "Add"}
          </Button>
        </div>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}

      {cars?.length ? (
        <div className="px-6 py-4">
          <h1 className="mb-4 text-3xl text-red-500">Available Cars</h1>

          {cars?.map((item: any, index: number) => {
            return (
              <CarCard
                key={index}
                id={item._id}
                carType={item.vehicleClass}
                carName={item.vehicleName}
                maxPerson={item.maxPeople}
                maxBag={item.maxSuitCase}
                carImage={item.image}
                setCars={setCars}
                w={319}
                h={319}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};
const CarCard: React.FC<IVehicleClass> = ({
  carType,
  carName,
  maxPerson,
  maxBag,
  carImage,
  id,
  setCars,
  w,
  h,
}) => {
  return (
    <div
      className={`flex flex-col justify-between  ${
        carType == "Luxury SUV" && "mb-6"
      }`}
    >
      <div className="border-b pb-2">
        <div className="text-2xl font-semibold flex justify-between items-center">
          <span>{carType}</span>
          <button
            onClick={async () => {
              await api()
                .delete(`/Drive/deleteCar/${id}`)
                .then((data: any) => {
                  setCars(data.data.data);
                  Success("Car Successfly Deleted.");
                })
                .catch((err) => {
                  Error(
                    err.response.data.message ||
                      "An error has occurred, please try again."
                  );
                });
            }}
          >
            <FontAwesomeIcon icon="trash" className="text-red-500 text-lg" />
          </button>
        </div>
        <div className="">{carName}</div>
        <div className="flex items-center">
          <div className="text-primary-vehicleClassColor mr-4 flex items-center">
            <FontAwesomeIcon icon="users" className=" mr-1" />
            &nbsp;
            <span>max.&nbsp;{maxPerson}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img className="object-cover" src={carImage} width={w} height={h} />
      </div>
    </div>
  );
};
export default withAuth(account);
