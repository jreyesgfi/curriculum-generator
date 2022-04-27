import logo from './logo.svg';
import './App.css';
import curriculum from './curriculum.json';
import { useEffect, useState } from 'react';
import downloadPdf from 'dom-to-pdf';



function App() {
  const [documentCV, setDocumentCV] = useState({});
  const [finalCV, setFinalCV] = useState(
    (<div>Cargando</div>)
  );

  const keyGenerator=()=>Math.floor(Math.random() * (10**17));

  const generateTitle=(level,text)=>{
    text = text.toUpperCase();
    var title = null;
    const key = keyGenerator();
    if (level==1){
      title= (<h1 key={key}>{text}</h1>)
    }
    else if (level==2){
      title= (<h2 key={key}>{text}</h2>)
    }
    else if (level==3){
      title= (<h3 key={key}>{text}</h3>)
    }
    else if (level==4){
      title= (<h4 key={key}>{text}</h4>)
    }
    else{
      title= (<h5 key={key}>{text}</h5>)
    }
    return title;
  }

  const generateBody=(level,text)=>{
    return <p className='body'>{text}</p>
  }

  const generateDate=(level,text)=>{
    return <p className='date'>{text}</p>
  }

  const generateItem= (level,text)=>{
    return (
      <div>
        <p key={keyGenerator()}>{text}</p>
      </div>
    )
  }
  const generatePlainText= (level,text)=>{
    if (text === '-'){
      text = '';
    }
    if (level === 2){
      text= (
        <h2>{text}</h2>
      );
    }
    else if (level === 3){
      text= (
        <h3>{text}</h3>
      );
    }

    return(
      text
    )
  }

  const generateLogo= (level,url)=>{
    if (url=='-'){
      return(
        <img className={`logo-${level} logo`} src={'/icons/software_competences_logo.svg'}>
        </img>
      )
    }
    return(
      <img className={`logo-${level} logo`} src={url} alt="alternatetext">
      </img>
    )
  }

  const generateExperience= (level,experience)=>{
    return(
      <div className='experience-lines-container'>
        <div className='background-line'>
        </div>
        <div className='experience-line' style={{width:`${experience*10}%`}}>
        </div>
      </div>
    )
  }

  function CreateDoc(props){
    const level = props.level;
    const dict = props.dict;
    const className = '';
    return (
      <div className={`container-${level} level-container ${className} `}>
        {dict['title'] &&
        <div className={`title-container title-container-${level} container`}>
          {dict['logo'] &&
            <div className={'logo-container container'}>
              {generateLogo(level,dict['logo'])}
            </div>
          }
          {generateTitle(level,dict['title'])}
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
      console.log('hi')
      
      const element = document.getElementById('cv');
      var options = {
        filename: 'cv.pdf'
      };
      downloadPdf(element, options, function(pdf) {
        console.log('done');
      });
    }
    catch(e){
      console.log(e)
    }

  }



  return (
    <div className="App">
        <div
        style={{background:'#999',position:'absolute', right:'15cm', width: '5cm'}}
          onClick={()=>{
            fetch(curriculum).then(()=>{
              setDocumentCV(curriculum)}
              ).catch((e)=>{console.log(e)})

          }}>
            Clicka
        </div>
        <div
        style={{background:'#999',position:'absolute', right:'9cm', width: '5cm'}}
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
