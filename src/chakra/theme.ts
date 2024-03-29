import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

import { Button } from './button'

export const theme = extendTheme({
    colors: {
        brand: {
            100: "FF3c00",

        },
    },
    font: {
        body: 'Open Sans , sans-serif',
    },
    styles: {
        global: () => ({
            body: {
                bg: 'gray.200'
            }
        })
    },
    components :{
        Button
    }
})