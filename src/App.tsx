import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// https://jsonplaceholder.typicode.com/users

interface IInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

function App(): JSX.Element {
  const [infoArray, setInfoArray] = useState<IInfo[]>([]);

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [infoArray]);

  const getInfo = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    setInfoArray((curInfoArray) => [...curInfoArray, ...res.data]);

    console.log('info data add...');
  };

  // IntersectionObserver 설정
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target); // entry 관찰 해제
        getInfo(); // 데이터 가져오기
      }
    });
  };

  const Wrapper = {
    width: '800px',

    margin: '0 auto',
  };

  const Box = {
    border: '1px solid olive',
    borderRadius: '8px',

    boxShadow: '1px 1px 2px olive',

    margin: '18px 0',
  };

  const BoxTable = {
    borderSpacing: '15px',
  };

  const Title = {
    fontWeight: 700,
  };

  return (
    <div style={Wrapper}>
      {infoArray.map((info, index) => {
        if (infoArray.length - 5 === index) {
          // 관찰되는 요소가 있는 html, 아래에서 5번째에 해당하는 박스를 관찰
          return (
            <div style={Box} ref={boxRef} key={index}>
              <table style={BoxTable}>
                <tbody>
                  <tr>
                    <td style={Title}>아이디</td>
                    <td>{info.id}</td>
                  </tr>
                  <tr>
                    <td style={Title}>이름</td>
                    <td>{info.name}</td>
                  </tr>

                  <tr>
                    <td style={Title}>전화번호</td>
                    <td>{info.phone}</td>
                  </tr>

                  <tr>
                    <td style={Title}>이메일</td>
                    <td>{info.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        } else {
          // 관찰되는 요소가 없는 html
          return (
            <div style={Box} key={index}>
              <table style={BoxTable} key={index}>
                <tbody>
                  <tr>
                    <td style={Title}>아이디</td>
                    <td>{info.id}</td>
                  </tr>
                  <tr>
                    <td style={Title}>이름</td>
                    <td>{info.name}</td>
                  </tr>

                  <tr>
                    <td style={Title}>전화번호</td>
                    <td>{info.phone}</td>
                  </tr>

                  <tr>
                    <td style={Title}>이메일</td>
                    <td>{info.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
}

export default App;
