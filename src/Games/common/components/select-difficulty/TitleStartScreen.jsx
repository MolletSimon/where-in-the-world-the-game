import Title from "../../../../components/Utils/Title";
import Pulse from "react-reveal/Pulse";

export function TitleStartScreen({ image, alt, title }) {
  return (
    <div className="flex justify-evenly items-center m-8 w-4/5">
      <Pulse>
        <img
          src={image}
          alt={alt}
          width={80}
          className="hidden sm:block md:hidden"
        />
        <img src={image} alt={alt} className="md:block hidden" width={100} />
        <Title text={title} margin="0" />
        <img
          src={image}
          alt={alt}
          width={80}
          className="hidden sm:block md:hidden"
        />
        <img src={image} alt={alt} width={100} className="md:block hidden" />
      </Pulse>
    </div>
  );
}
