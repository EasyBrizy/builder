import React, { FC } from "react";

export interface Props {
  token: string;
}

export const Docs: FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Documentation {props.token}</h1>

        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            1
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">
              Step 1: Install the preconfigured app
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
              nulla ac urna ultricies eleifend. Integer id metus at risus
              commodo pulvinar ac eget sapien.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            2
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">
              Step 2: Open the app folder
            </h2>
            <p className="text-lg">
              Curabitur sit amet est vel risus commodo vulputate. Fusce
              fringilla, odio id vestibulum vestibulum, mi tortor consequat
              neque, at lacinia justo ligula et metus.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            3
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">
              Step 3: Configure the settings
            </h2>
            <p className="text-lg">
              Integer varius mauris vitae tellus auctor fringilla. Sed malesuada
              ipsum a ipsum fringilla lacinia.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            4
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">Step 4: Run the app</h2>
            <p className="text-lg">
              Proin fermentum justo eget turpis vestibulum, eget rhoncus lectus
              finibus. Etiam dignissim pulvinar ligula at tincidunt.
            </p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            5
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-2">Step 5: Access the app</h2>
            <p className="text-lg">
              Nam feugiat augue sed turpis viverra, at semper ex consectetur.
              Vestibulum venenatis, elit nec vulputate imperdiet.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
          <p className="text-lg">
            For more details and advanced usage, please refer to the full
            documentation available at{" "}
            <a
              className="text-blue-500 underline"
              href="https://example.com/documentation"
            >
              https://example.com/documentation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
