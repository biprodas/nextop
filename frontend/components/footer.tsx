import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Container from "~/components/container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <Container>
        <div className="h-12 flex justify-between items-center">
          <small>
            Copyright © {year} <strong>NextUp</strong>. All rights reserved.
          </small>
          <small>
            Developed with <FaHeart size={12} className="inline-block" /> by{" "}
            <Link href="">biprodas.ry</Link>
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
