/** @format */

const ShowTimeDuration = ({ data }) => {
  return (
    <div className="w-36 h-36">
      <div className="w-full h-full bg-gradient-to-tl from-purple-400 via-blue-400 to-blue-500 text-white font-semibold text-center rounded-lg">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500 flex flex-col justify-center items-center rounded-lg">
          {data}
        </div>
      </div>
    </div>
  );
};

export default ShowTimeDuration;
