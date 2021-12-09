export default function Tsx(props: { test: () => void }) {
  return <button onClick={props.test}>Hi</button>
}
