import React from 'react';
import styled from "styled-components";  
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {Button} from "@material-ui/core";
import { firebase } from '../firebase';


function Header() {
   const signOut=()=>{
      firebase.auth().signOut();
   }
  return (
   <HeaderContainer>
      <HeaderLeft>

         <HeaderAvatar
            
         />
         <AccessTimeIcon/>
         
      </HeaderLeft>
      <HeaderSearch>
         <SearchIcon />
         <input placeholder='Search'/>

      </HeaderSearch>
      <HeaderRight>
      <HelpOutlineIcon /> 
          <HeaderButton >
            <Button onClick={signOut} color="primary">
            Sign Out
               </Button>
          </HeaderButton> 
          
            
      </HeaderRight>
   </HeaderContainer>
);
}

export default Header;
const HeaderSearch = styled.div`
flex:0.4;
opacity:1;
border-radius:6px;
background-color:#421f44;
text-align:center;
display:flex;
padding : 0 50px;
color:gray;
border:1px gray solid;
>input{
   background-color:transparent;
   border:none;
   text-align:center;
   min-width:40vw;
   outline:0;
   color:yellow
   ;
}
`;
const HeaderButton = styled.div`
box-sizing:border-box;
display:inline-block;
text-align:center;
padding:8x 12px;
color:white;
background-color:#421f44;
border:3px solid;
border-color:transparent;
border-radius:10px;
font-size:18px;
font-color:white;
&:hover:not(:disabled),
&:active:not(:disabled),
&:focus{
   outline:0;
   color:white;
   border-color:grey;
   backgroud-color:salmon;
   cusor:pointer;
}

`

const HeaderContainer = styled.div`
   display : flex ;
   position: fixed;
   width:100%;
   align-items:center;
   justify-content:space-between;
   padding : 10px 0;
   background-color : var(--slack-color);
   color:white;

`;
const HeaderLeft = styled.div`
 flex:0.3;
 display: flex;
 align-items : center;
 margin-left:20px;

 > .MuiSvgIcon-root{
    margin-left:auto;
    margin-right:30px;
 }
`;
const HeaderRight = styled.div`
   flex:0.3;
   display:flex;
   align-items:flex-end;
   > .MuiSvgIcon-root{
      margin-left:auto;
      margin-right:20px;
   }

`;
const HeaderAvatar = styled(Avatar)`
cursor : pointer;

:hover{
   opacity:0.8;
}

`;



