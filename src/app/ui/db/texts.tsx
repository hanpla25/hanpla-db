import { getText } from "@/app/lib/data";

export default async function Texts() {
  const texts = await getText();

  if (!texts || texts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-center text-lg">
        원하는 데이터를 저장해보세요
      </div>
    );
  }

  return (
    <div className="mt-5 mx-4 p-4 bg-white rounded-[30px] shadow-md min-h-24 max-w-[1244px] xl:mx-auto">
      <div className="flex justify-end mb-2">
        <button className="text-sm text-blue-500 hover:underline">
          첨부파일
        </button>
      </div>
      {texts.map((text, index) => (
        <p key={index} className="mb-2">
          {text.text}
        </p>
      ))}
    </div>
  );
}
