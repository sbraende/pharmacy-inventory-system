class Utility {
  static TimestampToDisplayDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", { dateStyle: "medium" });
  }

  static ISODateToNormalizedDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  }
}

export default Utility;
