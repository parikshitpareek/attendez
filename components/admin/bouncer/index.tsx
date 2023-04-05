import React from 'react';
import Scanner from './scanner';

function BouncerMain() {
  // const [decodedResults, setDecodedResults] = useState();
  const onNewScanResult = (decodedText: any, decodedResult: any) => {
    console.log(
      'decoded text is ',
      decodedText,
      ' and decoded result is ',
      decodedResult
    );

    document.getElementById('html5-qrcode-button-camera-stop')?.click();

    return;
  };
  return (
    <>
      <div className="h-full flex justify-center flex-row items-center">
        <Scanner
          fps={20}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
    </>
  );
}

export default BouncerMain;
