import React from 'react'
import NextPayment from '../components/NextPayment'
import PreviousPayments from '../components/PreviousPayments'
import info from '../assets/currentUserInfo.json'

function Payment  ()  {
  return (
    <>
    <NextPayment/>
    <PreviousPayments/>
    </>
  )
}

export default Payment
