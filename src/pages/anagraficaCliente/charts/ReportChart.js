import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import anagraficaData from '../../data/anagraficaData';



const ReportChart = ({data}) => {

  const [dataChart,setData] = React.useState([]);
  const [renderer,setRender] = React.useState(false)
  const { getInterventoListData } = anagraficaData()

  React.useEffect(() => {
    async function initialData(){
      function chooseMonth(num){
        switch(num){
          case 1:
            return 'GEN'
            break;
          case 2:
            return 'FEB'
            break;
          case 3:
            return 'MAR'
            break;
          case 4:
            return 'APR'
            break;
          case 5:
            return 'MAG'
            break;
          case 6:
            return 'GIU'
            break;
          case 7:
            return 'LUG'
            break;
          case 8:
            return 'AGO'
            break;
          case 9:
            return 'SET'
            break;
          case 10:
            return 'OTT'
            break;
          case 11:
            return 'NOV'
            break;
          case 12:
            return 'DIC'
            break;
        }
      }
      let full = dataChart
      for(let i=1;i<=12;i++){
        let monthAct = data.filter( cMonth => 
          cMonth.dataInizio.split('-')[1] == (i<10 ? "0"+i : i)
          
        )
        let asenza = 0
        let acon = 0
        if(monthAct.length > 0 ){
          monthAct.map( current => {
            if(current.interventi > 0){
              acon += current.interventi
            }else{
              asenza ++
            }
          } )
        }
        console.log(acon,asenza)
  
        full.push( {mese:chooseMonth(i), 'Attività senza Anomalie':asenza, 'Attività con Anomalie':acon} )
        console.log(full)
      }
      setData(full)
      setRender(true)
    }
    initialData()
    
  }, [])

    const { innerWidth: width, innerHeight: height } = window;

    return (
      <>
        {renderer === true ? (
          <BarChart
          width={(width / 100) * 39}
          height={400}
          data={dataChart}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          {console.log(dataChart)}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis style={{fontSize:'0.5vw'}}dataKey="mese" />
          <YAxis style={{fontSize:'0.5vw'}}/>
          <Tooltip />
          <Bar barSize={15} dataKey="Attività senza Anomalie" stackId="a" fill="#fe5461" />
          <Bar barSize={15} dataKey="Attività con Anomalie" stackId="a" fill="#4d8aff" />
        </BarChart>
        ) : null}
      </>
    )
}

export default ReportChart