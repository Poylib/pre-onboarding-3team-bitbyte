import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from '../components/Spinner';
import Contents from '../components/themeComponents/Contents';
import UserResponseArea from './UserResponseArea';
import InquiryButton from './InquiryButton';
import PurchaseButton from './PurchaseButton';

const Theme = () => {
  const [imgList, setImgList] = useState([]);
  const [isLiveTheme, setIsLiveTheme] = useState(false);
  const [loding, setLoding] = useState(false);
  const params = useParams();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    (async () => {
      setLoding(true);
      try {
        const {
          data: { data },
        } = await axios.get(`https://api.plkey.app/theme/${params.id}`);
        setImgList(data.figure);
        // setPrice(data.price); price 맛나 ? 몰루
        setIsLiveTheme(data.isLiveTheme);
        setLoding(false);
      } catch (error) {
        console.log(error);
        alert('통신 실패하였습니다.');
        setLoding(true);
      }
    })();
  }, []);

  if (loding) {
    return <Spinner />;
  }

  return (
    <>
      <StyledTheme>
        <Contents imgList={imgList} isLiveTheme={isLiveTheme} />
        <UserResponseArea />
        <InquiryButton />
        <PurchaseButton price={price} />
      </StyledTheme>
    </>
  );
};

export default Theme;

const StyledTheme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  --pink: rgba(255, 65, 125, 1);
  --font-gray: rgba(145, 146, 153, 1);
`;
