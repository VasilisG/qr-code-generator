import { useRef, useState } from 'react';
import QRCode from 'qrcode';
import { OPTIONS, IMAGE_TYPES, CORRECTION_LEVELS, DOWNLOAD_NAME } from './Constants';
import './App.css'

function App() {

  const [options, setOptions] = useState(OPTIONS);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const downloadButtonRef = useRef(null);
  const mainContainerRef = useRef(null);

  const handleOptionChange = (type) => (event) => {
    setOptions({
      ...options,
      [type]: event.target.value
    });
  }

  const handleChange = (event) => {
    setContent(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    QRCode.toDataURL(content, options, (err, url) => {
      if (err) setError(err);
      else {
        setImageUrl(url);
        downloadButtonRef.current.scrollIntoView({ 'behavior': 'smooth' });
      }
    });
  }

  const handleReset = () => {
    setOptions(OPTIONS);
    setContent('');
    setImageUrl('');
    setError('');
    mainContainerRef.current.scrollIntoView({ 'behavior': 'smooth' });
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = DOWNLOAD_NAME + options['type'].replace('image/', '.');
    link.href = imageUrl;
    link.click();
  }

  return (
    <>
      <div className="title-container">
        <h1 className="text-white">QR Code Generator</h1>
        <span className="block mt-4 italic text-white/75">Enter your text in the field and click <strong>Generate QR Code</strong>.</span>
      </div>
      <div ref={mainContainerRef} className="main-app-container flex flex-col lg:flex-row mt-6">
        <div className="form-container p-3 sm:p-6 w-full lg:w-1/2 bg-black/25 lg:border-r-2 lg:border-white/10">
          <form className="qr-form" onSubmit={handleSubmit}>
            <div className="field-container flex flex-col">
              <label htmlFor="content" className="text-white font-bold">Content</label>
              <textarea 
                required
                id="content"
                className="content-area w-full mt-2 p-4 min-h-40 text-white bg-black/30" 
                placeholder="Enter your text here..."
                onChange={handleChange}
                value={content}
              ></textarea>
            </div>
            <div className="options-container gap-x-3 mt-6">
              <div className="error-correction-level-container flex flex-col">
                <label htmlFor="error-correction" className="text-white font-bold">Error Correction</label>
                <select required id="error-correction" className="selection error-correction-selection mt-2 h-10 px-4 text-white bg-black/30" value={options.errorCorrectionLevel} onChange={handleOptionChange('errorCorrectionLevel')}>
                  {CORRECTION_LEVELS.map((option, index) => <option title={option.title} key={index} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div className="image-type-container flex flex-col mt-5">
                <label htmlFor="image-type" className="text-white font-bold">Image Type</label>
                <select required id="image-type" className="selection image-type-selection mt-2 h-10 px-4 text-white bg-black/30" value={options.type} onChange={handleOptionChange('type')}>
                  {IMAGE_TYPES.map((option, index) => <option key={index} value={option}>{option}</option>)}
                </select>
              </div>
              <div className="quality-container flex flex-col mt-5">
                <label htmlFor="quality" className="text-white font-bold">Quality</label>
                <input required id="quality" type="range" className="range quality-range h-10 text-white bg-black/30" onChange={handleOptionChange('quality')} value={options.quality} min={0} max={1} step={0.1}/>
              </div>
              <div className="margin-container flex flex-col mt-5">
                <label htmlFor="margin" className="text-white font-bold">Margin</label>
                <input required id="margin" type="range" className="range margin-range h-10 text-white bg-black/30" onChange={handleOptionChange('margin')} value={options.margin} min={1} max={10} step={1}/>
              </div>
            </div>
            <div className="button-container flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-y-0 sm:gap-x-4 mt-6">
              <button type="submit" className="text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200 outline-none">Generate QR Code</button>
              <button type="button" className="text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transition-colors duration-200 outline-none" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
        <div className="result-image-container w-full lg:w-1/2 p-6 mx-auto bg-black/25 flex flex-col items-center">
          <div className="result-image mt-6 p-4 w-full h-96 bg-black/50 flex justify-center items-center">
            {imageUrl ? <img className="qr-code-image" src={imageUrl} alt="QR Code"/> : null}
          </div>
          <div className="image-actions-container flex justify-center gap-x-4 mt-6">
              <button ref={downloadButtonRef} type="button" disabled={imageUrl === ''} className="text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 transition-colors duration-200 outline-none disabled:opacity-50" onClick={handleDownload}>Download Image</button>
          </div>
        </div>
      </div>
      <div className="error-container">
        <span className="error">{error}</span>
      </div>
    </>
  )
}

export default App;