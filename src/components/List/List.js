import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { button, clear, copy, form, each, textarea } from './list.module.css'

const List = () => {
  const [encodeValue, setEncodeValue] = useState('')
  const [decodeValue, setDecodeValue] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [decodedList, setDecodedList] = useState([])
  const [_, setCopied] = useState({ copied: false })

  const encode = event => {
    event.preventDefault()
    const encoded = window.btoa(encodeValue)
    setEncoded(encoded)
  }

  const decode = event => {
    event.preventDefault()
    try {
      const decoded = window.atob(decodeValue)
      setDecoded(decoded)
      const list = [...decodedList, decoded]
      setDecodedList(list)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = ({ target }, isEncode) => {
    isEncode ? setEncodeValue(target.value) : setDecodeValue(target.value)
  }

  return (
    <main className='list'>
      <form className={form} onSubmit={encode}>
        <div className={each}>
          <label>
            Encode
            <textarea
              className={textarea}
              placeholder='Encode'
              value={encodeValue}
              onChange={event => handleChange(event, true)}
            />
          </label>
        </div>
        <button
          className={`${button} ${clear}`}
          onClick={() => setEncodeValue('')}
        >
          Clear
        </button>
        <button className={button} type='submit'>
          Encode
        </button>
      </form>

      <div className={each}>
        <textarea className={textarea} placeholder='Encoded' value={encoded} />
        <br />
        <CopyToClipboard
          text={encoded}
          onCopy={() => setCopied({ copied: true })}
        >
          <button className={`${button} ${copy}`}>Copy to clipboard</button>
        </CopyToClipboard>
      </div>

      <form className={form} onSubmit={decode}>
        <div className={each}>
          <label>
            Decode
            <textarea
              className={textarea}
              placeholder='Decode'
              value={decodeValue}
              onChange={event => handleChange(event, false)}
            />
          </label>
        </div>
        <button
          className={`${button} ${clear}`}
          onClick={() => setDecodeValue('')}
        >
          Clear
        </button>
        <button className={button} type='submit'>
          Decode
        </button>
      </form>

      <div className={each}>
        <textarea className={textarea} placeholder='Decoded' value={decoded} />
      </div>

      <div>
        {!!decodedList.length &&
          decodedList.map((item, i) => (
            <div key={`${i}-${item}`} className={each}>
              <a href={item} title={item} target='_blank' rel='noreferrer'>
                {item}
              </a>
            </div>
          ))}
      </div>
    </main>
  )
}

export default List
