// Imports
import { useQRCode } from "next-qrcode";

interface QaCodeProps {
    data: string;
    width: number;
  }

export default function QRCode(props: QaCodeProps) {
    const { Image } = useQRCode();
  
    return (
      <Image
        text={props.data}
        options={{
          type: 'image/jpeg',
          quality: 1,
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: !!props.width ? props.width : 200,
          color: {
            dark: '#000',
            light: '#FFFFFF',
          },
        }}
      />
    );
  };