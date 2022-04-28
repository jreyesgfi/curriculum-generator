export function keyGenerator(){Math.floor(Math.random() * (10**17));}

export function generateTitle(level,text,style=''){
    if (style!=='mail'){
      text = text.toUpperCase();
    }
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
    return(
    <div className={`title-box title-box-${level}`}>
      {title}
    </div>)
  }

export function generateBody(level,text){
    return <p className='body'>{text}</p>
}

export function generateDate(level,text){
    return <p className='date'>{text}</p>
}

export function generateItem(level,text){
    return (
      <div>
        <p key={keyGenerator()}>{text}</p>
      </div>
    )
}
export function generatePlainText(level,text){
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

export function generateLogo (level,url){
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

export function generateExperience(level,experience){
    return(
      <div className='experience-lines-container'>
        <div className='background-line'>
        </div>
        <div className='experience-line' style={{width:`${experience*10}%`}}>
        </div>
      </div>
    )
}