import { AIPracticePage } from '@/components/sections/AIPracticePage';

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