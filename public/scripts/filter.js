const search = async (callback) => {
  const driver = document.getElementById("driver").value;
  const date = document.getElementById("date").value;
  const time = Number(document.getElementById("time").value);
  const capacity = document.getElementById("capacity").value || 0;
  console.log(capacity);
  console.log(driver);
  console.log(new Date(date).setHours(time));

  const cars = await Binar.listCars(
    (data) =>
      data.availableAt < new Date(date).setHours(time) &&
      data.capacity > capacity &&
      data.driverType === driver
  );

  // display cars on grid
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  cars.forEach((car) => {
    const newElement = document.createElement("div");
    newElement.classList.add(
      "p-4",
      "rounded-sm",
      "bg-white",
      "border",
      "border-slate-300",
      "flex",
      "h-auto",
      "flex-col",
      "justify-between",
      "gap-4"
    );

    newElement.innerHTML = new Car(car).render();
    grid.appendChild(newElement);
  });

  console.log(cars);
};
