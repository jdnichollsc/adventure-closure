import { useState, useEffect, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'

import { WS_DOMAIN } from '../../contants'
import { useAuth } from '../useAuth'

// TODO: Create a npm package for this :)
export function useSocket (
  events?: { [key: string]: () => void }
) {
  const { state } = useAuth()
  const [socket, setSocket] = useState<typeof Socket | null>(null)

  useEffect(function () {
    const newSocket = io.connect(WS_DOMAIN, {
      query: {
        token: state.token
      }
    })
    setSocket(newSocket)
    for (const key in events) {
      newSocket.on(key, events[key])
    }

    return () => {
      newSocket.removeAllListeners()
      newSocket.close()
    }
  }, [events, state.token])

  const onSendMessage = useCallback((eventName: string, data: any) => {
    if(socket) socket.emit(eventName, data)
  }, [socket])

  return {
    socket,
    onSendMessage
  }
}
