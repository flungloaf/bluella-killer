import jimp from 'jimp';

async function main() {
  const image = await jimp.read('test/image.png');

  image.normalize();
  image.write("test/fixed.png");
}

main();
