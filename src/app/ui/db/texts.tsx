import { Text } from "@/app/lib/definitions";

export default function Texts({ texts }: { texts: Text[] | null }) {
  if (!texts || texts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-center text-lg">
        원하는 데이터를 저장해보세요
      </div>
    );
  }

  return (
    <div className="mt-5 mx-4 xl:mx-[auto] max-w-[1258px] space-y-5">
      <div className="flex p-4 bg-white rounded-[30px] shadow-md min-h-24">
        {/* 왼쪽: 텍스트 영역 */}
        <div className="flex-1 mr-4 ">
          <p className="break-all text-sm">
            3298ur3289r932j94rt34r43f43f434frj329fj392ur
          </p>
        </div>

        {/* 오른쪽: 버튼 + 시간 */}
        <div className="flex flex-col justify-between shrink-0 text-right">
          <button className="text-sm text-blue-500 hover:underline">
            첨부파일
          </button>
          <span className="text-xs">시간</span>
        </div>
      </div>
    </div>
  );
}
