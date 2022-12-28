import bcrypt from 'bcryptjs';

const hashData = async (data) => {
  const hashingData = await bcrypt.hash(data, 10);
  return hashingData;
};

export default hashData;
