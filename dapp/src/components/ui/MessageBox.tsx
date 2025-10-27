import { X } from "lucide-react";

export function MessageBox({ errorMessage,setError }:any) {
  const message = {
    title: "Error",
    body: "Failed to connect to wallet. Please connect wallet first ",
  };

  return (
    <section
      id="message-container"
      className="absolute inset-0 z-99 bg-gray-700 opacity-95 text-2xl font-semi-bold "
    >
      <section
        id="card"
        className="bg-gray-600 shadow-xl my-[10%] mx-[30%] w-[35%] h-[30%] border-2 rounded-2xl flex flex-col p-3 "
      >
        <section
          id="cancel-icon"
          className="ml-auto hover:bg-gray-400 p-2 rounded-xl active:scale-105"
        >
          <button onClick={() => setError(false)}> X </button>
        </section>
        <section
          id="message"
          className="mb-4  flex flex-col justify-center items-center  "
        >
          <section id="message-title" className="text-3xl text-orange-300 font-bold">
            {errorMessage?.title} !
          </section>
          <section id="message-body" className="text-wrap p-4">
            {errorMessage?.body}
          </section>
        </section>
      </section>
    </section>
  );
}
