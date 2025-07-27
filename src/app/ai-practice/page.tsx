import { AIPracticePage } from '@/components/AIPracticePage';

export default function AIPracticePageRoute() {
  return (
    <AIPracticePage 
      language="ko" 
      week={1}
      phase={1}
      mode="guided"
    />
  );
}