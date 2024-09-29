import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* left section    */}
      <div className="mb-5 w-40">
        <img src={assets.logo} alt="" />
      </div>
      {/* center section */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      {/* right section */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li>1800 1090</li>
          <li>khambenh@vn.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
