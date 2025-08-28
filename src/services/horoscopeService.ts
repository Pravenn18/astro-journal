import { Horoscope } from '../types';

const MOCK_HOROSCOPES: Record<string, Horoscope[]> = {
  aries: [
    {
      sign: 'aries',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Today is a day of bold action and new beginnings. Your fiery energy will help you overcome any obstacles. Trust your instincts and take that leap of faith you\'ve been considering.',
      compatibility: 'Leo, Sagittarius',
      mood: 'Energetic',
      luckyNumber: '9',
      luckyTime: '9:00 AM'
    }
  ],
  taurus: [
    {
      sign: 'taurus',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your practical nature serves you well today. Focus on building solid foundations and nurturing your relationships. Financial opportunities may arise - trust your judgment.',
      compatibility: 'Virgo, Capricorn',
      mood: 'Stable',
      luckyNumber: '6',
      luckyTime: '2:00 PM'
    }
  ],
  gemini: [
    {
      sign: 'gemini',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Communication is your superpower today. Share your ideas and connect with others. Your curiosity will lead you to exciting discoveries. Stay open to new perspectives.',
      compatibility: 'Libra, Aquarius',
      mood: 'Curious',
      luckyNumber: '5',
      luckyTime: '11:00 AM'
    }
  ],
  cancer: [
    {
      sign: 'cancer',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your intuition is heightened today. Listen to your inner voice and trust your emotional intelligence. Nurture your loved ones and create a cozy, safe environment.',
      compatibility: 'Scorpio, Pisces',
      mood: 'Intuitive',
      luckyNumber: '2',
      luckyTime: '7:00 PM'
    }
  ],
  leo: [
    {
      sign: 'leo',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your natural leadership shines today. Others are drawn to your confidence and charisma. Take center stage and share your creative talents with the world.',
      compatibility: 'Aries, Sagittarius',
      mood: 'Confident',
      luckyNumber: '1',
      luckyTime: '12:00 PM'
    }
  ],
  virgo: [
    {
      sign: 'virgo',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your attention to detail will be rewarded today. Focus on organization and efficiency. Help others with your practical wisdom and analytical mind.',
      compatibility: 'Taurus, Capricorn',
      mood: 'Analytical',
      luckyNumber: '7',
      luckyTime: '3:00 PM'
    }
  ],
  libra: [
    {
      sign: 'libra',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Balance and harmony are your themes today. Seek fairness in all situations and use your diplomatic skills to resolve conflicts. Your sense of beauty inspires others.',
      compatibility: 'Gemini, Aquarius',
      mood: 'Balanced',
      luckyNumber: '6',
      luckyTime: '4:00 PM'
    }
  ],
  scorpio: [
    {
      sign: 'scorpio',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your intensity and passion are magnetic today. Dive deep into meaningful conversations and explore the mysteries of life. Trust your powerful intuition.',
      compatibility: 'Cancer, Pisces',
      mood: 'Passionate',
      luckyNumber: '8',
      luckyTime: '8:00 PM'
    }
  ],
  sagittarius: [
    {
      sign: 'sagittarius',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Adventure calls your name today! Embrace new experiences and expand your horizons. Your optimism and wisdom will guide you to exciting opportunities.',
      compatibility: 'Aries, Leo',
      mood: 'Adventurous',
      luckyNumber: '3',
      luckyTime: '10:00 AM'
    }
  ],
  capricorn: [
    {
      sign: 'capricorn',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your ambition and determination are at their peak today. Set clear goals and work steadily toward them. Your practical approach will bring long-term success.',
      compatibility: 'Taurus, Virgo',
      mood: 'Ambitious',
      luckyNumber: '4',
      luckyTime: '6:00 PM'
    }
  ],
  aquarius: [
    {
      sign: 'aquarius',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Innovation and originality are your strengths today. Think outside the box and embrace your unique perspective. Connect with like-minded individuals who share your vision.',
      compatibility: 'Gemini, Libra',
      mood: 'Innovative',
      luckyNumber: '11',
      luckyTime: '1:00 PM'
    }
  ],
  pisces: [
    {
      sign: 'pisces',
      date: new Date().toISOString().split('T')[0],
      horoscope: 'Your creativity and spirituality are heightened today. Trust your dreams and artistic instincts. Connect with your inner self through meditation or creative expression.',
      compatibility: 'Cancer, Scorpio',
      mood: 'Dreamy',
      luckyNumber: '12',
      luckyTime: '9:00 PM'
    }
  ]
};

export class HoroscopeService {
  static async getDailyHoroscope(sign: string): Promise<Horoscope | null> {
    try {
      const response = await fetch(`https://aztro.sameerkumar.website?sign=${sign}&day=today`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          sign: sign,
          date: new Date().toISOString().split('T')[0],
          horoscope: data.description || 'Your daily horoscope is here to guide you.',
          compatibility: data.compatibility || 'Check your compatibility today.',
          mood: data.mood || 'Balanced',
          luckyNumber: data.lucky_number || '7',
          luckyTime: data.lucky_time || '12:00 PM'
        };
      }
    } catch (error) {
      console.log('API call failed, using mock data:', error);
    }

    const mockHoroscope = MOCK_HOROSCOPES[sign]?.[0];
    if (mockHoroscope) {
      mockHoroscope.date = new Date().toISOString().split('T')[0];
      return mockHoroscope;
    }

    return null;
  }

  static getMockHoroscope(sign: string): Horoscope | null {
    return MOCK_HOROSCOPES[sign]?.[0] || null;
  }
}
