import Image from "next/image";

interface Props {
  questionEN?: string;
  questionES?: string;
  textEN?: string;
  textES?: string;
  image?: string;
  video?: string;
}

const Questions = ({
  questionEN,
  questionES,
  textEN,
  textES,
  image,
  video,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4 items-justify text-justify">
        {questionEN && <p className="text-h5">{questionEN}</p>}
        {questionES && <p className="text-h5">{questionES}</p>}
        {textEN && <p className="secondary-text">{textEN}</p>}
        {textES && <p className="secondary-text">{textES}</p>}
        {image && (
          <Image
            src={image}
            alt=""
            width={250}
            height={400}
            className="mx-auto"
          />
        )}
        {video && (
          <div className="max-w-6xl mx-auto">
            <video controls autoPlay muted src={video}></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
