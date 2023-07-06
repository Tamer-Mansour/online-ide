import React, { useEffect, useRef, useState } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './IDE.css'


const IDE = () => {
    const editorRef = useRef(null);
    const [consoleOutput, setConsoleOutput] = useState('');
    const [consoleError, setConsoleError] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [languageOptions, setLanguageOptions] = useState([]);
    const [themeMode, setThemeMode] = useState('dark');
    const [background, setBackground] = useState('#000000');
    const [consoleFontFamily, setConsoleFontFamily] = useState('monospace');
    const [consoleColor, setConsoleColor] = useState('#00ff00');

    useEffect(() => {
        // Get the available languages
        const languages = monaco.languages.getLanguages();
        const options = languages.map((language) => ({
            label: language.id,
            value: language.id,
        }));
        setLanguageOptions(options);
    }, []);

    useEffect(() => {
        // Load saved code from local storage if available
        // const savedCode = localStorage.getItem('code');
        // if (savedCode) {
        //   editorRef.current.setValue(savedCode);
        // }
    }, []);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    function runCode() {
        const code = editorRef.current.getValue();

        try {
            // Clear previous console output and error
            setConsoleOutput('');
            setConsoleError('');

            // Redirect console.log output to the setConsoleOutput function
            const redirectConsoleLog = (output) => {
                setConsoleOutput((prevOutput) => prevOutput + output + '\n');
            };

            // Override console.log to redirect the output
            const originalConsoleLog = console.log;
            console.log = redirectConsoleLog;

            // Execute the code based on the selected language
            switch (selectedLanguage) {
                case 'javascript':
                    eval(code);
                    break;
                // Add cases for other languages here
                default:
                    setConsoleError(`Language '${selectedLanguage}' is not supported.`);
            }

            // Restore the original console.log
            console.log = originalConsoleLog;
        } catch (error) {
            // Display the error in the console
            setConsoleError(error.toString());
        }
    }

    function handleLanguageChange(event) {
        setSelectedLanguage(event.target.value);
    }

    function handleThemeModeChange(event) {
        setThemeMode(event.target.value);
    }

    function handleBackgroundChange(event) {
        setBackground(event.target.value);
    }

    function handleCopyCode() {
        const code = editorRef.current.getValue();
        navigator.clipboard.writeText(code);
    }

    function handleCodeChange(value) {
        localStorage.setItem('code', value);
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            background: {
                default: background,
            },
        },
    });

    const consoleStyle = {
        fontFamily: consoleFontFamily,
        color: consoleColor,
    };
    const theBackgroundColor = {
        backgroundColor: background,
    }

    return (
        <div style={theBackgroundColor}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" sx={{ height: '5rem' }}>
                    <Toolbar sx={{ marginTop: '10px' }}>
                        <Button onClick={runCode} variant="contained" color="secondary" startIcon={<PlayArrowIcon />}>
                            Run
                        </Button>
                        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, marginLeft: '10px' }}>
                            Language: {selectedLanguage}
                        </Typography>
                        <FormControl sx={{ marginRight: '20px', width: '10rem' }}>
                            <InputLabel id="language-select-label">Language</InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                label="Language"
                            >
                                {languageOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginRight: '20px', width: '10rem' }}>
                            <InputLabel id="theme-mode-select-label">Theme Mode</InputLabel>
                            <Select
                                value={themeMode}
                                labelId="theme-mode-select-label"
                                id="theme-mode-select"
                                onChange={handleThemeModeChange}
                                label="Theme Mode"
                            >
                                <MenuItem value="light">Light</MenuItem>
                                <MenuItem value="dark">Dark</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginRight: '20px', width: '10rem' }}>
                            <InputLabel id="theme-mode-select-label">Background</InputLabel>
                            <Select
                                value={background}
                                labelId=""
                                id=""
                                onChange={handleBackgroundChange}
                                label="Background"
                            >
                                <MenuItem value="#ffffff">Light</MenuItem>
                                <MenuItem value="#000000">Dark</MenuItem>
                                <MenuItem value="#ff0000">Red</MenuItem>
                                <MenuItem value="#2196f3">Blue</MenuItem>
                                <MenuItem value="#4caf50">Green</MenuItem>
                                <MenuItem value="#ffeb3b">Yellow</MenuItem>
                                <MenuItem value="#ff9800">Orange</MenuItem>
                                <MenuItem value="#e91e63">Pink</MenuItem>
                                <MenuItem value="#9e9e9e">Gray</MenuItem>
                                <MenuItem value="#009688">Teal</MenuItem>
                                <MenuItem value="#795548">Brown</MenuItem>
                                <MenuItem value="#3f51b5">Indigo</MenuItem>
                                <MenuItem value="#00bcd4">Cyan</MenuItem>
                                <MenuItem value="#cddc39">Lime</MenuItem>
                                <MenuItem value="#673ab7">Deep Purple</MenuItem>
                                <MenuItem value="#ffc107">Amber</MenuItem>
                                <MenuItem value="#03a9f4">Light Blue</MenuItem>
                                <MenuItem value="#ff5722">Deep Orange</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FA8072">Salmon</MenuItem>
                                <MenuItem value="#E0B0FF">Mauve</MenuItem>
                                <MenuItem value="#FFD700">Gold</MenuItem>
                                <MenuItem value="#00FFFF">Aqua</MenuItem>
                                <MenuItem value="#FF00FF">Magenta</MenuItem>
                                <MenuItem value="#808000">Olive</MenuItem>
                                <MenuItem value="#DA70D6">Orchid</MenuItem>
                                <MenuItem value="#708090">Slate</MenuItem>
                                <MenuItem value="#CCCCFF">Periwinkle</MenuItem>
                                <MenuItem value="#FFDAB9">Peach</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FA8072">Salmon</MenuItem>
                                <MenuItem value="#E0B0FF">Mauve</MenuItem>
                                <MenuItem value="#C0C0C0">Silver</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FF007F">Rose</MenuItem>
                                <MenuItem value="#98FF98">Mint</MenuItem>
                                <MenuItem value="#CD7F32">Bronze</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '10rem' }}>
                            <InputLabel id="console-font-family-label">Console Font Family</InputLabel>
                            <Select
                                value={consoleFontFamily}
                                labelId="console-font-family-label"
                                id="console-font-family"
                                onChange={(e) => setConsoleFontFamily(e.target.value)}
                                label="Console Font Family"
                            >
                                <MenuItem value="monospace">Monospace</MenuItem>
                                <MenuItem value="Arial, sans-serif">Arial</MenuItem>
                                <MenuItem value="Verdana, sans-serif">Verdana</MenuItem>
                                <MenuItem value="Courier New, monospace">Courier New</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginLeft: '20px', width: '10rem' }}>
                            <InputLabel id="console-color-label">Console Color</InputLabel>
                            <Select
                                value={consoleColor}
                                labelId="console-color-label"
                                id="console-color"
                                onChange={(e) => setConsoleColor(e.target.value)}
                                label="Console Color"
                            >
                                <MenuItem value="#ffffff">White</MenuItem>
                                <MenuItem value="#000000">Black</MenuItem>
                                <MenuItem value="#ff0000">Red</MenuItem>
                                <MenuItem value="#2196f3">Blue</MenuItem>
                                <MenuItem value="#4caf50">Green</MenuItem>
                                <MenuItem value="#ffeb3b">Yellow</MenuItem>
                                <MenuItem value="#ff9800">Orange</MenuItem>
                                <MenuItem value="#e91e63">Pink</MenuItem>
                                <MenuItem value="#9e9e9e">Gray</MenuItem>
                                <MenuItem value="#009688">Teal</MenuItem>
                                <MenuItem value="#795548">Brown</MenuItem>
                                <MenuItem value="#3f51b5">Indigo</MenuItem>
                                <MenuItem value="#00bcd4">Cyan</MenuItem>
                                <MenuItem value="#cddc39">Lime</MenuItem>
                                <MenuItem value="#673ab7">Deep Purple</MenuItem>
                                <MenuItem value="#ffc107">Amber</MenuItem>
                                <MenuItem value="#03a9f4">Light Blue</MenuItem>
                                <MenuItem value="#ff5722">Deep Orange</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FA8072">Salmon</MenuItem>
                                <MenuItem value="#E0B0FF">Mauve</MenuItem>
                                <MenuItem value="#FFD700">Gold</MenuItem>
                                <MenuItem value="#00FFFF">Aqua</MenuItem>
                                <MenuItem value="#FF00FF">Magenta</MenuItem>
                                <MenuItem value="#808000">Olive</MenuItem>
                                <MenuItem value="#DA70D6">Orchid</MenuItem>
                                <MenuItem value="#708090">Slate</MenuItem>
                                <MenuItem value="#CCCCFF">Periwinkle</MenuItem>
                                <MenuItem value="#FFDAB9">Peach</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FA8072">Salmon</MenuItem>
                                <MenuItem value="#E0B0FF">Mauve</MenuItem>
                                <MenuItem value="#C0C0C0">Silver</MenuItem>
                                <MenuItem value="#FF7F50">Coral</MenuItem>
                                <MenuItem value="#40E0D0">Turquoise</MenuItem>
                                <MenuItem value="#E6E6FA">Lavender</MenuItem>
                                <MenuItem value="#FF007F">Rose</MenuItem>
                                <MenuItem value="#98FF98">Mint</MenuItem>
                                <MenuItem value="#CD7F32">Bronze</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ marginLeft: '20px', width: '10rem' }} onClick={handleCopyCode} variant="contained" color="primary" startIcon={<FileCopyIcon />}>
                            Copy Code
                        </Button>

                    </Toolbar>
                </AppBar>
                <div style={{ display: 'flex', marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
                    <Card sx={{ flex: 1, marginRight: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">Code Editor:</Typography>
                            <Editor
                                theme={themeMode === 'light' ? 'vs-light' : 'vs-dark'}
                                language={selectedLanguage}
                                defaultValue="// Enter your code here..."
                                onMount={handleEditorDidMount}
                                width="100%"
                                height="500px"
                                onChange={handleCodeChange}
                            />
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6">Console:</Typography>
                            <div style={consoleStyle}>
                                <pre>{consoleOutput}</pre>
                                <pre>{consoleError}</pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default IDE;
