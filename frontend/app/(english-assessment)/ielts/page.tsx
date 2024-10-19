import React from "react";
import NavLink from "~/components/nav-link";

export default function Ielts() {
  return (
    <div className="">
      <ul className="">
        <li>
          <NavLink href="/ielts/listening">Listening</NavLink>
        </li>
        <li>
          <NavLink href="/ielts/reading">Reading</NavLink>
        </li>
        <li>
          <NavLink href="/ielts/writing">Writing</NavLink>
        </li>
        <li>
          <NavLink href="/ielts/speaking">Speaking</NavLink>
        </li>
      </ul>
    </div>
  );
}
