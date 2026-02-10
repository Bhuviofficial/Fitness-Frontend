useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setStats({
        caloriesToday: data.stats.caloriesToday,
        caloriesBurnedToday: data.stats.caloriesBurnedToday,
        workout: data.stats.workoutMinutes,
      });

      setWeeklyCalories(data.weeklyCalories);
      setWeeklyBurned(data.weeklyBurned);

    } catch (err) {
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);
