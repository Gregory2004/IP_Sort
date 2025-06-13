import { useState } from 'react'
import angle from '/src/assets/icons/angle.png';
// это то что вы сказали в качестве роутсев ,если я правильно понял 
const routes = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '0.0.0.0',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet'
  },
  {
    uuid: '2',
    address: '193.0.174.1',
    mask: '255.255.255.255',
    gateway: '0.0.0.0',
    interface: 'Гостовая сеть'
  },
  {
    uuid: '3',
    address: '10.1.30.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть'
  },
  {
    uuid: '4',
    address: '192.168.1.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet'
  },
  {
    uuid: '5',
    address: '193.0.174.0',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet'
  },
  {
    uuid: '6',
    address: '193.0.175.10',
    mask: '255.255.255.128',
    gateway: '193.0.174.200',
    interface: 'Подключение Ethernet'
  },
  {
    uuid: '7',
    address: '180.0.175.100',
    mask: '255.255.255.255',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet'
  }
];
//Тут мы считаем единички в маске 
function checkBinar(string) {
  let number = 0
  const array = string.split('.')
  for (let elems = 0; elems < array.length; elems++) {
    let stringed = (+array[elems]).toString(2).split('')
    for (let j = 0; j < stringed.length; j++) {
      if (stringed[j] === '1') {
        ++number
      }
      else {
        continue
      }
    }
  }
  return number
}
//Тут сортируются данные и рендерятся 
function IpSort() {


  function sravnenie(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  function sortArr(array, param, filter) {
    if (param == null) {
      return array
    }
    const resultat = [...array].sort((a, b) => {
      if (param !== 'interface') {
        const ipA = a[param].split('.').map(Number);
        const ipB = b[param].split('.').map(Number);
        let res = 0
        for (let i = 0; i < 4; i++) {
          const result = sravnenie(ipA[i], ipB[i]);
          if (result !== 0) return result;
        }
        return 0;
      } else {
        return sravnenie(a.interface, b.interface);
      }
    });
    if (filter == 'asc') {
      return resultat
    }
    return resultat.reverse()
  }
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

// Обработка клика
 function handleClick(property) {
  setSortField(property);
  setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
}

  const sartArr = sortArr(routes, sortField, sortDirection)
  function Sorted({ routes, property, name, flag }) {
    let butt = sortField === property
  ? (sortDirection === 'asc' ? '180deg' : '0') 
  : '-90deg';

    return (
      <tr style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <th style={{ backgroundColor: 'rgb(235,235,240)', display: 'flex', justifyContent: 'space-between', height: '40px', alignItems: 'center', }}>{name}<button onClick={() => handleClick(property)} style={{ border: '0', backgroundColor: 'transparent', cursor: 'pointer', width: '30px', height: '100%', display: 'flex', alignItems: 'center' }}><img src={angle} style={{transform:`rotate(${butt})` , width: "12px", height: '12px', rotate: "-90deg" }} /></button></th>

        {routes.map((Element) =>
        (
          <td style={{borderBottom:'1px solid rgba(192, 192, 192, 0.47)' ,padding:'15px 0'}} key={Element.uuid}>{Element[property]}{flag ? `/${checkBinar(Element.mask)}` : ""}</td>
        )
        )}
      </tr>
    )
  }

  return (
    <table style={{ display: 'flex',height:'100vh',alignItems:'center',justifyContent:'center' }}>
      <Sorted routes={sartArr} property="address" name="Адрес Назначения" flag={true} />
      <Sorted routes={sartArr} property="gateway" name="Шлюз" />
      <Sorted routes={sartArr} property="interface" name="Шлюз" />
    </table>
  )
}
// полный старт 
function App() {
  return (
    <>
      <IpSort />
    </>
  )
}

export default App
