import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import Avatarimage from "../../../assets/avatar-bg-image/images.png";
const Profile = (props) => {
  const { name, value, onChange } = props;
  const avatarUrl = useRef(Avatarimage);
  // "https://avatarfiles.alphacoders.com/161/161002.jpg"
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <span className="mt-6 font-bold text-white"></span>

      {modalOpen && (
        <Modal
        value={value}
        name={name}
        onChange={onChange}
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
