import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer className="mt-8 text-slate-600 py-4 flex items-center justify-center gap-4">
            &copy; 2025 Phillip Cantu
            <Separator orientation="vertical" className="min-h-4" />
            <a
                href="https://www.linkedin.com/in/phillipcantu/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <BsLinkedin className="text-slate-600 hover:text-slate-100 transition duration-300" />
            </a>
            <a
                href="https://github.com/hereisphil"
                target="_blank"
                rel="noopener noreferrer"
            >
                <BsGithub className="text-slate-600 hover:text-slate-100 transition duration-300" />
            </a>
        </footer>
    );
};

export default Footer;
