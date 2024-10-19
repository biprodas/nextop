import React from "react";
import ListeningAnswerSheet from "../../_components/listening-answer-sheet";

export default function ListeningPracticePage() {
  return (
    <div>
      <h2>Listening Practice</h2>
      <div className="grid grid-cols-12">
        <div className="col-span-5 border p-3">
          <h2>TODO</h2>
          <ul>
            <li>- Play Recording</li>
            <li>- Show Transcripts</li>
          </ul>
        </div>
        <div className="col-span-7 border p-3">
          <ListeningAnswerSheet />
        </div>
      </div>
    </div>
  );
}
