const dbKey = 'blkfit-db';
const sessionKey = 'blkfit-session';
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const screens = document.querySelectorAll('.screen.hide-on-login');
const navLinks = document.querySelectorAll('.nav-link');

const auth = {
  loginForm: document.getElementById('login-form'),
  registerForm: document.getElementById('register-form'),
  showRegister: document.getElementById('show-register'),
  showLogin: document.getElementById('show-login'),
};

const dashboard = {
  userGreeting: document.getElementById('user-greeting'),
  userRole: document.getElementById('user-role-label'),
  protocolCount: document.getElementById('protocol-count'),
  sessionCount: document.getElementById('session-count'),
  aiSuggestions: document.getElementById('ai-suggestions'),
  summary: document.getElementById('dashboard-summary'),
  nextAction: document.getElementById('next-action'),
  protocolTraining: document.getElementById('dashboard-protocol-training'),
  protocolNutrition: document.getElementById('dashboard-protocol-nutrition'),
  protocolHormone: document.getElementById('dashboard-protocol-hormone'),
};

const training = {
  library: document.getElementById('exercise-library'),
  form: document.getElementById('workout-form'),
  log: document.getElementById('workout-log'),
};

const nutrition = {
  planType: document.getElementById('plan-type'),
  weight: document.getElementById('nutrition-weight'),
  height: document.getElementById('nutrition-height'),
  age: document.getElementById('nutrition-age'),
  macros: {
    calories: document.getElementById('macro-calories'),
    protein: document.getElementById('macro-protein'),
    carbs: document.getElementById('macro-carbs'),
    fat: document.getElementById('macro-fat'),
  },
  protocol: document.getElementById('nutrition-protocol'),
  button: document.getElementById('calculate-macros'),
};

const progress = {
  weight: document.getElementById('progress-weight'),
  bf: document.getElementById('progress-bf'),
  saveButton: document.getElementById('save-progress'),
  summaryWeight: document.getElementById('summary-weight'),
  summaryBf: document.getElementById('summary-bf'),
  summaryStreak: document.getElementById('summary-streak'),
  log: document.getElementById('progress-log'),
};

const coach = {
  button: document.getElementById('run-ai-coach'),
  response: document.getElementById('ai-response'),
};

const hormones = {
  symptom: document.getElementById('hormone-symptom'),
  date: document.getElementById('hormone-date'),
  saveButton: document.getElementById('save-symptom'),
  exam: document.getElementById('hormone-exam'),
  uploadButton: document.getElementById('upload-exam'),
  log: document.getElementById('hormone-log'),
};

const medical = {
  type: document.getElementById('appointment-type'),
  date: document.getElementById('appointment-date'),
  time: document.getElementById('appointment-time'),
  saveButton: document.getElementById('save-appointment'),
  log: document.getElementById('appointment-log'),
};

const community = {
  post: document.getElementById('community-post'),
  button: document.getElementById('post-community'),
  log: document.getElementById('community-log'),
};

const profile = {
  name: document.getElementById('profile-name'),
  email: document.getElementById('profile-email'),
  role: document.getElementById('profile-role'),
  saveButton: document.getElementById('save-profile'),
};

const settings = {
  darkMode: document.getElementById('toggle-darkmode'),
};

const onboardingScreen = document.getElementById('onboarding-screen');
const completeOnboardingButton = document.getElementById('complete-onboarding');
const logoutButton = document.getElementById('logout-button');

const sampleExercises = [
  { name: 'Agachamento', type: 'Força', focus: 'Pernas', detail: 'Classic squat, foca pernas e core.' },
  { name: 'Supino', type: 'Força', focus: 'Peito', detail: 'Supino reto para peitoral e tríceps.' },
  { name: 'Remada Curvada', type: 'Força', focus: 'Costas', detail: 'Linha de puxada para dorsais.' },
  { name: 'Prancha', type: 'Core', focus: 'Core', detail: 'Estabilidade e resistência do core.' },
  { name: 'Corrida', type: 'Cardio', focus: 'Resistência', detail: 'Treino cardiovascular de baixa intensidade.' },
];

function loadDatabase() {
  const raw = localStorage.getItem(dbKey);
  if (!raw) {
    const initial = {
      users: [
        { id: 1, name: 'Admin BLKF', email: 'admin@blkfit.com', password: 'admin123', role: 'Admin', profile: { darkMode: true, onboardComplete: true }, protocols: { training: 'Plano inicial', nutrition: 'Plano inicial', hormone: 'Monitoramento inicial' }, progress: [], workouts: [], nutrition: {}, hormone: { symptoms: [], exams: [] }, appointments: [] },
        { id: 2, name: 'Dr. Médico', email: 'medico@blkfit.com', password: 'medico123', role: 'Médico', profile: { darkMode: true, onboardComplete: true }, protocols: {}, progress: [], workouts: [], nutrition: {}, hormone: { symptoms: [], exams: [] }, appointments: [] },
        { id: 3, name: 'Nutri Coach', email: 'nutri@blkfit.com', password: 'nutri123', role: 'Nutricionista', profile: { darkMode: true, onboardComplete: true }, protocols: {}, progress: [], workouts: [], nutrition: {}, hormone: { symptoms: [], exams: [] }, appointments: [] },
        { id: 4, name: 'Elite User', email: 'elite@blkfit.com', password: 'elite123', role: 'Usuário Elite', profile: { darkMode: true, onboardComplete: true }, protocols: { training: 'Força avançada', nutrition: 'Cutting', hormone: 'Suporte médico' }, progress: [], workouts: [], nutrition: {}, hormone: { symptoms: [], exams: [] }, appointments: [] },
      ],
      community: [
        { id: 1, author: 'Elite User', message: 'Comecei meu protocolo Elite e já sinto melhor recuperação.', date: new Date().toLocaleDateString() },
      ],
      appointments: [],
    };
    localStorage.setItem(dbKey, JSON.stringify(initial));
    return initial;
  }
  try { return JSON.parse(raw); }
  catch { return { users: [], community: [], appointments: [] }; }
}

function saveDatabase(db) {
  localStorage.setItem(dbKey, JSON.stringify(db));
}

function getSession() {
  const raw = localStorage.getItem(sessionKey);
  return raw ? JSON.parse(raw) : null;
}

function setSession(userId) {
  localStorage.setItem(sessionKey, JSON.stringify({ userId }));
}

function clearSession() {
  localStorage.removeItem(sessionKey);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const db = loadDatabase();
  return db.users.find((user) => user.id === session.userId) || null;
}

function updateCurrentUser(data) {
  const db = loadDatabase();
  const index = db.users.findIndex((user) => user.id === data.id);
  if (index >= 0) {
    db.users[index] = data;
    saveDatabase(db);
  }
}

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.add('hidden'));
  document.getElementById(`${screenId}-screen`).classList.remove('hidden');
  navLinks.forEach((button) => button.classList.toggle('active', button.dataset.screen === screenId));
}

function renderExerciseLibrary() {
  training.library.innerHTML = sampleExercises.map((exercise) => `
    <div class="exercise-card">
      <h4>${exercise.name}</h4>
      <p><strong>${exercise.type}</strong> • ${exercise.focus}</p>
      <p>${exercise.detail}</p>
    </div>
  `).join('');
}

function renderWorkouts(user) {
  training.log.innerHTML = '';
  if (!user.workouts.length) {
    training.log.innerHTML = '<li>Nenhuma sessão registrada ainda.</li>';
    return;
  }
  user.workouts.slice().reverse().forEach((session) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${session.name}</strong><span>${session.duration} min • ${session.intensity}</span><p>${session.note || 'Sem observações'}</p>`;
    training.log.appendChild(li);
  });
}

function renderProgress(user) {
  progress.log.innerHTML = '';
  if (!user.progress.length) {
    progress.log.innerHTML = '<li>Nenhuma medida registrada ainda.</li>';
    progress.summaryWeight.textContent = '— kg';
    progress.summaryBf.textContent = '— %';
    progress.summaryStreak.textContent = '0 dias';
    return;
  }
  const latest = user.progress[user.progress.length - 1];
  progress.summaryWeight.textContent = `${latest.weight} kg`;
  progress.summaryBf.textContent = `${latest.bf}%`;
  progress.summaryStreak.textContent = `${Math.min(user.progress.length, 7)} dias`;
  user.progress.slice().reverse().forEach((entry) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${entry.date}</strong><span>Peso: ${entry.weight} kg • BF: ${entry.bf}%</span>`;
    progress.log.appendChild(li);
  });
}

function renderHormoneLog(user) {
  hormones.log.innerHTML = '';
  const combined = [...user.hormone.symptoms.map((item) => ({ type: 'Sintoma', title: item.sintoma, date: item.date })), ...user.hormone.exams.map((item) => ({ type: 'Exame', title: item.fileName, date: item.date }))];
  if (!combined.length) {
    hormones.log.innerHTML = '<li>Nenhum registro hormonal encontrado.</li>';
    return;
  }
  combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  combined.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.type}</strong><span>${item.title}</span><p>${item.date}</p>`;
    hormones.log.appendChild(li);
  });
}

function renderAppointments(user) {
  const db = loadDatabase();
  const appointments = db.appointments.filter((item) => item.userId === user.id || user.role === 'Admin' || user.role === 'Médico' || user.role === 'Nutricionista');
  medical.log.innerHTML = '';
  if (!appointments.length) {
    medical.log.innerHTML = '<li>Nenhuma consulta agendada.</li>';
    return;
  }
  appointments.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  appointments.forEach((appointment) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${appointment.type}</strong><span>${appointment.date} • ${appointment.time}</span><p>Status: ${appointment.status}</p>`;
    medical.log.appendChild(li);
  });
}

function renderCommunity() {
  const db = loadDatabase();
  community.log.innerHTML = '';
  if (!db.community.length) {
    community.log.innerHTML = '<li>Nenhuma publicação ainda.</li>';
    return;
  }
  db.community.slice().reverse().forEach((post) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.author}</strong><span>${post.date}</span><p>${post.message}</p>`;
    community.log.appendChild(li);
  });
}

function renderProfile(user) {
  profile.name.value = user.name;
  profile.email.value = user.email;
  profile.role.value = user.role;
}

function applyUserContext(user) {
  dashboard.userGreeting.textContent = user.name.split(' ')[0] || user.name;
  dashboard.userRole.textContent = user.role;
  dashboard.protocolCount.textContent = Object.keys(user.protocols || {}).length;
  dashboard.sessionCount.textContent = user.workouts.length;
  dashboard.aiSuggestions.textContent = user.role === 'Usuário Elite' ? 'Personalizado Elite' : 'Atualizado';
  dashboard.summary.textContent = `Seu protocolo principal: ${user.protocols.training || 'Defina um plano de treino'} com foco em ${user.protocols.nutrition || 'definição'} e suporte hormonal.`;
  dashboard.nextAction.textContent = 'Abra o IA Coach para analisar seu último treino e fazer o melhor ajuste.';
  dashboard.protocolTraining.textContent = user.protocols.training || 'Sem protocolo de treino definido.';
  dashboard.protocolNutrition.textContent = user.protocols.nutrition || 'Sem plano nutricional definido.';
  dashboard.protocolHormone.textContent = user.protocols.hormone || 'Sem protocolo hormonal ativo.';
  renderWorkouts(user);
  renderProgress(user);
  renderHormoneLog(user);
  renderAppointments(user);
  renderCommunity();
  renderProfile(user);
  if (user.profile.darkMode) {
    document.body.classList.add('dark-mode');
    settings.darkMode.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    settings.darkMode.checked = false;
  }
}

function navigateTo(screenId) {
  showScreen(screenId);
}

function showApp() {
  loginScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  onboardingScreen.classList.add('hidden');
  document.querySelectorAll('.hide-on-login').forEach((section) => section.classList.remove('hidden'));
  showScreen('dashboard');
}

function showOnboarding() {
  loginScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  onboardingScreen.classList.remove('hidden');
  document.querySelectorAll('.hide-on-login').forEach((section) => section.classList.add('hidden'));
}

function showAuth(screen) {
  loginScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  document.querySelectorAll('.hide-on-login').forEach((section) => section.classList.add('hidden'));
  document.getElementById(`${screen}-screen`).classList.remove('hidden');
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const db = loadDatabase();
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    alert('Credenciais inválidas. Use um usuário existente ou cadastre-se.');
    return;
  }
  setSession(user.id);
  setupApp();
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const role = document.getElementById('register-role').value;
  const db = loadDatabase();
  if (db.users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
    alert('Já existe uma conta com este e-mail.');
    return;
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role,
    profile: { darkMode: true, onboardComplete: false },
    protocols: { training: 'Plano inicial', nutrition: 'Ajuste de macros', hormone: 'Monitoramento básico' },
    progress: [],
    workouts: [],
    nutrition: {},
    hormone: { symptoms: [], exams: [] },
    appointments: [],
  };
  db.users.push(newUser);
  saveDatabase(db);
  setSession(newUser.id);
  setupApp();
}

function completeOnboarding() {
  const user = getCurrentUser();
  if (!user) return;
  user.profile.onboardComplete = true;
  updateCurrentUser(user);
  setupApp();
}

function saveWorkout(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const name = document.getElementById('workout-name').value.trim();
  const duration = Number(document.getElementById('workout-duration').value);
  const intensity = document.getElementById('workout-intensity').value;
  const note = document.getElementById('workout-note').value.trim();
  if (!name || !duration) return;
  user.workouts.push({ id: Date.now(), name, duration, intensity, note, date: new Date().toLocaleDateString() });
  updateCurrentUser(user);
  renderWorkouts(user);
  applyUserContext(user);
  training.form.reset();
}

function calculateMacros() {
  const user = getCurrentUser();
  if (!user) return;
  const weight = Number(nutrition.weight.value);
  const height = Number(nutrition.height.value);
  const age = Number(nutrition.age.value);
  const type = nutrition.planType.value;
  if (!weight || !height || !age) {
    alert('Preencha peso, altura e idade.');
    return;
  }
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const factor = type === 'Bulking' ? 1.35 : type === 'Cutting' ? 1.05 : 1.2;
  const calories = Math.round(bmr * factor);
  const protein = Math.round(weight * 2.2);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  nutrition.macros.calories.textContent = `${calories} kcal`;
  nutrition.macros.protein.textContent = `${protein} g`;
  nutrition.macros.fat.textContent = `${fat} g`;
  nutrition.macros.carbs.textContent = `${carbs} g`;
  nutrition.protocol.textContent = `Protocolo ${type} configurado com ${calories} kcal. Ajuste quando houver mudança de peso.`;
  user.nutrition = { weight, height, age, type, calories, protein, fat, carbs };
  user.protocols.nutrition = type;
  updateCurrentUser(user);
  applyUserContext(user);
}

function saveProgress() {
  const user = getCurrentUser();
  if (!user) return;
  const weight = Number(progress.weight.value);
  const bf = Number(progress.bf.value);
  if (!weight || !bf) {
    alert('Preencha peso e BF.');
    return;
  }
  const entry = { id: Date.now(), weight, bf, date: new Date().toLocaleDateString() };
  user.progress.push(entry);
  updateCurrentUser(user);
  renderProgress(user);
  applyUserContext(user);
  progress.weight.value = '';
  progress.bf.value = '';
}

function runAiCoach() {
  const user = getCurrentUser();
  if (!user) return;
  const workoutCount = user.workouts.length;
  const protocol = user.protocols.training || 'treino padrão';
  let advice = `Baseado em ${workoutCount} sessões, seu protocolo atual é ${protocol}.`;
  if (workoutCount === 0) advice = 'Comece registrando sua primeira sessão para receber recomendações personalizadas.';
  else if (user.role === 'Usuário Elite') advice = 'Você está pronto para um ciclo avançado. Inclua deload a cada 4 semanas e priorize recuperação ativa.';
  else if (user.role === 'Usuário Premium') advice = 'Mantenha a consistência e use variações bi-set para estimular adaptação muscular.';
  else advice = 'Foque em progressão incremental e mantenha a alimentação alinhada ao seu objetivo.';
  coach.response.textContent = advice;
}

function saveSymptom() {
  const user = getCurrentUser();
  if (!user) return;
  const sintoma = hormones.symptom.value.trim();
  const date = hormones.date.value || new Date().toLocaleDateString();
  if (!sintoma) return;
  user.hormone.symptoms.push({ id: Date.now(), sintoma, date });
  updateCurrentUser(user);
  renderHormoneLog(user);
  hormones.symptom.value = '';
  hormones.date.value = '';
}

function uploadExam() {
  const user = getCurrentUser();
  if (!user) return;
  const file = hormones.exam.files[0];
  if (!file) {
    alert('Selecione um arquivo para enviar.');
    return;
  }
  user.hormone.exams.push({ id: Date.now(), fileName: file.name, date: new Date().toLocaleDateString() });
  updateCurrentUser(user);
  renderHormoneLog(user);
  hormones.exam.value = '';
}

function saveAppointment() {
  const user = getCurrentUser();
  if (!user) return;
  const type = medical.type.value;
  const date = medical.date.value;
  const time = medical.time.value;
  if (!date || !time) {
    alert('Preencha data e hora.');
    return;
  }
  const db = loadDatabase();
  const appointment = { id: Date.now(), userId: user.id, author: user.name, type, date, time, status: 'Pendente' };
  db.appointments.push(appointment);
  saveDatabase(db);
  renderAppointments(user);
}

function postCommunity() {
  const user = getCurrentUser();
  if (!user) return;
  const message = community.post.value.trim();
  if (!message) return;
  const db = loadDatabase();
  db.community.push({ id: Date.now(), author: user.name, message, date: new Date().toLocaleDateString() });
  saveDatabase(db);
  renderCommunity();
  community.post.value = '';
}

function saveProfile() {
  const user = getCurrentUser();
  if (!user) return;
  user.name = profile.name.value.trim() || user.name;
  updateCurrentUser(user);
  applyUserContext(user);
  alert('Perfil atualizado.');
}

function toggleDarkMode() {
  const user = getCurrentUser();
  if (!user) return;
  const enabled = settings.darkMode.checked;
  document.body.classList.toggle('dark-mode', enabled);
  user.profile.darkMode = enabled;
  updateCurrentUser(user);
}

function setupApp() {
  const user = getCurrentUser();
  if (!user) {
    showAuth('login');
    return;
  }
  if (!user.profile.onboardComplete) {
    showOnboarding();
    return;
  }
  showApp();
  renderExerciseLibrary();
  applyUserContext(user);
}

auth.loginForm.addEventListener('submit', login);
auth.registerForm.addEventListener('submit', register);
auth.showRegister.addEventListener('click', () => showAuth('register'));
auth.showLogin.addEventListener('click', () => showAuth('login'));
completeOnboardingButton.addEventListener('click', completeOnboarding);
logoutButton.addEventListener('click', () => { clearSession(); showAuth('login'); });
training.form.addEventListener('submit', saveWorkout);
nutrition.button.addEventListener('click', calculateMacros);
progress.saveButton.addEventListener('click', saveProgress);
coach.button.addEventListener('click', runAiCoach);
hormones.saveButton.addEventListener('click', saveSymptom);
hormones.uploadButton.addEventListener('click', uploadExam);
medical.saveButton.addEventListener('click', saveAppointment);
community.button.addEventListener('click', postCommunity);
profile.saveButton.addEventListener('click', saveProfile);
settings.darkMode.addEventListener('change', toggleDarkMode);
navLinks.forEach((button) => button.addEventListener('click', () => navigateTo(button.dataset.screen)));

setupApp();
