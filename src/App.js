import logo from './logo.svg';
import './App.css';
import curriculum from './curriculum.json';
import { useEffect, useState } from 'react';
import downloadPdf from 'dom-to-pdf';
import domtoimage from "dom-to-image-even-more";
import { generateBody, generateDate, generateExperience, generateLogo, generatePlainText, generateTitle } from './ElementsGenerator';



function App() {
  const [documentCV, setDocumentCV] = useState({});
  const [finalCV, setFinalCV] = useState(
    (<div>Cargando</div>)
  );

  

  function CreateDoc(props){
    const level = props.level;
    const dict = props.dict;
    const className = '';
    return (
      <div className={`container-${level} level-container ${className} `}>
        {dict['date'] &&
            <div className='date-mark'>
            </div>
        }
        {dict['title'] &&
        <div className={`title-container title-container-${level} container`}>
          {dict['logo'] &&
            <div className={'logo-container container'}>
              {generateLogo(level,dict['logo'])}
            </div>
          }
          {generateTitle(level,dict['title'],dict['style'])}
        </div>
        }
        {dict['photo'] &&
            <div className={'photo-container container'}>
              {generateLogo(level,dict['photo'])}
            </div>
        }
        {dict['experience'] &&
            <div className={'experience-container container'}>
              {generateExperience(level,dict['experience'])}
            </div>
        }
        {dict['body'] &&
        <div className='body-container container'>
          {generateBody(level,dict['body'])}
        </div>
        }
        {dict['date'] &&
        <div className='date-container container'>
          {generateDate(level,dict['date'])}
        </div>
        }
        {
          /* dict is a dict */
          dict.constructor === Object &&
          <div className=''>
            {Object.keys(dict).map((key)=>{
              const value = dict[key];
              if (Array.isArray(value)&&typeof value !=='string'){
                return(
                  <div className={`style-${dict['style']}`}>
                    {value.map((element)=>(
                    <CreateDoc dict={element} level={level+1}>
                    </CreateDoc>)
                    )}
                  </div>
                )
              }

              else if (!['title','photo','logo','body','date','style'].includes(key)){
                return (
                  <CreateDoc dict={value} level={level+1}>
                  </CreateDoc>
                );
              }

              else {
                return null
              }
            })
            }
          </div>
        }{
          /* else*/
          (typeof dict ==='string') &&
          <div>
            {generatePlainText(level,dict)}
          </div>
          
        }
      </div>
    );
  }
  

  function printToPdf(){ 
    try{
      const element = document.getElementById('cv');
      var options = {
        filename: 'cv.pdf'
      };
      // downloadPdf(element, options, function(pdf) {
      //   console.log('done');
      // });

      options = {
        quality:1.0
      }
      domtoimage.toSvg(element).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
    catch(e){
      console.log(e)
    }
    

  }



  return (
    <div className="App">
        <div
        style={{background:'#999',position:'absolute', left:'1cm', width: '5cm'}}
          onClick={()=>{
            fetch(curriculum).then(()=>{
              setDocumentCV(curriculum)}
              ).catch((e)=>{console.log(e)})

          }}>
            Clicka
        </div>
        <div
        style={{background:'#999',position:'absolute', left:'4cm', width: '5cm'}}
          onClick={()=>{
            printToPdf();
          }}>
            Print to pdf
        </div>
        <div
          style={{background:'#fff'}}
          onClick={()=>{
           
          }}
          className='cv-container'
          id='cv'>
            <CreateDoc dict={documentCV} level={1}>
            </CreateDoc>
        </div>
    </div>
  );
}

export default App;
