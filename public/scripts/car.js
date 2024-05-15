class Car extends Component {
  constructor(data) {
    super(data);
  }

  render() {
    return `
    <img
      class="h-[300px] object-cover"
      src=${this.data.image.replace("./", "./public/")}
      alt="mobil"
    />
    <p class="font-normal">${this.data.type}</p>
    <p class="text-base font-bold">RP ${this.data.rentPerDay} / hari</p>
    <p class="font-light">${this.data.description}</p>
    <p class="font-light">${this.data.capacity} orang</p>
    <p class="font-light">${this.data.transmission}</p>
    <p class="font-light">Tahun ${this.data.year}</p>
    <button class="bg-green-500 text-white font-bold py-[14px]">
      Pilih Mobil
    </button>
    `;
  }
}
