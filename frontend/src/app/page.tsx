import ThemeToggle from '@/components/shared/theme-toogle'
import { Button, Flex, Text } from '@radix-ui/themes'

export default function Home() {
  return (
    <main className="md:flex p-3">
      <Flex direction="column" gap="2">
        <h4>Biprodas R.</h4>
        <Text>Hello from Radix Themes </Text>
        <Button>Lets go</Button>
      </Flex>
      <ThemeToggle />
    </main>
  )
}
