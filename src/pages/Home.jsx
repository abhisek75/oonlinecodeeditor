import React, { useState, useRef, useEffect } from "react";
import Editor from "../components/Editor";
import { html, css, js } from "../constants/defaultCode";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { VscDebugRerun } from "react-icons/vsc";
import { IoSaveOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Home = () => {
    const { user, logout } = useAuth();
    const [htmlCode, setHtmlCode] = useState(html);
    const [cssCode, setCssCode] = useState(css);
    const [jsCode, setJsCode] = useState(js);

    const [selectedFileType, setSelectedFileType] = useState("html");
    const iframeRef = useRef(null);

    // dark mode
    const [darkMode, setDarkMode] = useState(() => {
        // Get initial mode from localStorage if available
        const savedMode = localStorage.getItem("dark-mode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("dark-mode", JSON.stringify(true));
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("dark-mode", JSON.stringify(false));
        }
    }, [darkMode]);
    // end dark

    useEffect(() => {
        const fetchCode = async () => {
            if (!user || !user.id) {

                return;
            }

            const { data: codefile, error } = await supabase
                .from("codefile")
                .select("*")
                .eq("user_id", user.id)
                .single();

            if (error) {
                console.error('Error fetching code:', error);
                // toast.error(`Error fetching code: ${error.message}`);
                return;
            }

            if (codefile) {
                const { html = '', css = '', js = '' } = codefile; // Provide default values
                setHtmlCode(html);
                setCssCode(css);
                setJsCode(js);
            }
        };

        fetchCode();
    }, [user]); // Add user as a dependency



    // save code file in database
    const saveCode = async () => {
        let { data: codefile, error } = await supabase
            .from("codefile")
            .select("user_id")
            .eq("user_id", user.id);

        if (codefile[0]?.user_id) {
            const { data, error } = await supabase
                .from("codefile")
                .update({ html: htmlCode, css: cssCode, js: jsCode })
                .eq("user_id", user.id)
                .select();
            if (data) {
                toast.success('save code successfully')
            }
            else {
                toast.error(error.message)
            }
        } else {
            const { data, error } = await supabase
                .from("codefile")
                .insert([
                    { html: htmlCode, css: cssCode, js: jsCode, user_id: user.id },
                ])
                .select();
            console.log(error);
            console.log(user.id);
            if (data) {
                toast.success('save code successfully')
            }
            else {
                toast.error(error.message)
            }
        }
    };

    const handleEditorChange = (value) => {
        if (selectedFileType === "html") {
            setHtmlCode(value);
        } else if (selectedFileType === "css") {
            setCssCode(value);
        } else if (selectedFileType === "javascript") {
            setJsCode(value);
        }
    };

    const handleFileTypeChange = (fileType) => {
        setSelectedFileType(fileType);
    };

    const runCode = () => {
        const iframe = iframeRef.current;
        const document = iframe.contentDocument || iframe.contentWindow.document;
        document.open();
        document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `);
        document.close();
    };

    return (
        <div className="dark:bg:slate:900">
            {/* navbar */}
            <nav className="flex gap-2 justify-between pr-4 h-12 bg-gray-100 dark:bg-slate-900">
                <div>
                    <button
                        onClick={() => handleFileTypeChange("html")}
                        className={`px-4 py-2 dark:text-gray-200 ${selectedFileType === "html"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-700"
                            } transition`}
                    >
                        index.html
                    </button>
                    <button
                        onClick={() => handleFileTypeChange("css")}
                        className={`px-4 py-2 dark:text-gray-200 ${selectedFileType === "css"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-700"
                            } transition`}
                    >
                        style.css
                    </button>
                    <button
                        onClick={() => handleFileTypeChange("javascript")}
                        className={`px-4 py-2 dark:text-gray-200 ${selectedFileType === "javascript"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-700"
                            } transition`}
                    >
                        script.js
                    </button>
                </div>
                <div className="flex p-1 gap-2 h-full dark:bg-slate-900">
                    {/* save code */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                saveCode()
                            }}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center"
                        >
                            Save
                            <IoSaveOutline className="ml-2" />
                        </button>
                    </div>
                    {/* Run button */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={runCode}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center"
                        >
                            Run
                            <VscDebugRerun className="ml-2" />
                        </button>
                    </div>

                    {/* logOut */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition  flex items-center"
                        >
                            Logout
                            <IoLogOutOutline className="ml-2" />
                        </button>
                    </div>
                    {/* dark mode button */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-lg"
                    >
                        {darkMode ? (<FaRegMoon />) : (<IoSunny />)}
                    </button>
                </div>
            </nav>
            <div className="flex gap-1 w-full p-4 dark:bg-slate-900">
                <div className="w-[70%]">
                    {/* File type selection buttons */}

                    {/* Conditional rendering of editors */}
                    <div>
                        {selectedFileType === "html" && (
                            <Editor
                                theme={darkMode && "vs-dark"}
                                language="html"
                                value={htmlCode}
                                handleEditorChange={handleEditorChange}
                            />
                        )}
                        {selectedFileType === "css" && (
                            <Editor
                                theme={darkMode && "vs-dark"}
                                language="css"
                                value={cssCode}
                                handleEditorChange={handleEditorChange}
                            />
                        )}
                        {selectedFileType === "javascript" && (
                            <Editor
                                theme={darkMode && "vs-dark"}
                                language="javascript"
                                value={jsCode}
                                handleEditorChange={handleEditorChange}
                            />
                        )}
                    </div>
                </div>

                <div className="w-[30%] ">
                    {/* Output iframe */}
                    <div className="h-full">
                        <iframe
                            ref={iframeRef}
                            title="output"
                            className="w-full h-full border rounded shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
