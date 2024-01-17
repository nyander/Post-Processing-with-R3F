import React from 'react'
import DrunkEffect from './DrunkEffect.js'
import { forwardRef } from 'react';

export default forwardRef(function Drunk(props, ref)
{
  const effect = new DrunkEffect(props);
  return <primitive object={effect} />
})