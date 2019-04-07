let idCounter = 1;

export default function getId() {
  const id = idCounter;
  idCounter += 1;
  return id;
}
